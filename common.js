// 灵谋AI 原型全局数据中心 (基于 localStorage)
const DB_KEY = 'lingmou_ai_prototype_db';

const INITIAL_DATA = {
    tasks: [
        { id: 't1', source: '智能客服', type: 'boss', priority: 'high', title: '王女士（年卡VIP）客诉流失预警', goal: '挽回 2 万元年卡续费额', status: 'pending', targetRole: '老板' },
        { id: 't2', source: '老板参谋', type: 'system', priority: 'medium', title: '周末暴雨预警，建议开启“雨天暖心到店促”', goal: '填补预计 30% 的客流空缺', status: 'pending', targetRole: '老板' },
        { id: 't3', source: '经营管家', type: 'auto', priority: 'normal', title: '35 名沉睡客户短信唤醒计划已启动', goal: '预计召回 3-5 人到店', status: 'running', targetRole: '系统' }
    ],
    stats: {
        appointments: 42,
        estimatedRevenue: 15, // 单位：单
        retention: 8, // 单位：人
        highRisk: 2 // 单位：人
    },
    chatLogs: [
        { role: 'user', content: '你们那个夏日美白舱19.9的是真的吗？有没有隐形消费啊，我脸颊有点敏感能做吗。', time: '10:24' },
        { role: 'system', content: '⚡ [后台数据] 自动提取意向标签: 价格敏感、防备心理、脸颊敏感肌', type: 'backend' },
        { role: 'ai', content: '亲爱的，是真的哦！我们承诺绝无任何隐形消费。而且我们针对敏感肌会专门调低红光档位，非常温和的呢。您平时脸颊是泛红还是容易干痒呀？', time: '10:24' },
        { role: 'user', content: '都有点吧，稍微碰一下就红。你们店周末人多吗？', time: '10:25' },
        { role: 'system', content: '⚡ [转化漏斗] 策略判定: 消除疑虑，抛出到店诱饵', type: 'backend', color: '#10b981' },
        { role: 'ai', content: '太理解您了，这种皮肤日常确实难打理。周末人确实有点多，但考虑到您皮肤敏感，我帮您申请一个【单人静音VIP包间】做个免费的基底检测好不好？不用排队，环境也安静。', time: '10:25', action: 'booking' }
    ],
    tags: [
        { name: '怕排队', weight: 34 },
        { name: '价格敏感', weight: 21 },
        { name: '敏感肌修复', weight: 28 },
        { name: '小红书引流', weight: 10 },
        { name: '带娃没时间', weight: 7 }
    ],
    contentScripts: [
        { date: '周一', type: '小红书图文 x3', title: '防晒修复测评', status: '已发布', color: '#10b981' },
        { date: '周三', type: '抖音探店短视频 x1', title: '沉浸式抗老体验', status: '待审核', color: '#00e5ff' }
    ],
    backendStats: {
        tagsExtracted: 1452,
        tasksDispatched: 124,
        escalations: 3
    }
};

// 数据库核心封装
window.lmDB = {
    init: function() {
        if (!localStorage.getItem(DB_KEY)) {
            localStorage.setItem(DB_KEY, JSON.stringify(INITIAL_DATA));
        }
    },
    reset: function() {
        localStorage.setItem(DB_KEY, JSON.stringify(INITIAL_DATA));
        location.reload();
    },
    get: function() {
        return JSON.parse(localStorage.getItem(DB_KEY));
    },
    save: function(data) {
        localStorage.setItem(DB_KEY, JSON.stringify(data));
        // 触发自定义事件，通知页面数据更新
        window.dispatchEvent(new Event('lmDB_updated'));
    },
    
    // 快捷业务方法
    updateTaskStatus: function(taskId, newStatus) {
        let db = this.get();
        let task = db.tasks.find(t => t.id === taskId);
        if(task) {
            task.status = newStatus;
            this.save(db);
        }
    },
    addChat: function(role, content, extra = {}) {
        let db = this.get();
        let now = new Date();
        let timeStr = now.getHours().toString().padStart(2, '0') + ':' + now.getMinutes().toString().padStart(2, '0');
        db.chatLogs.push({ role, content, time: timeStr, ...extra });
        this.save(db);
    },
    addBackendLog: function(content, color = '') {
        let db = this.get();
        db.chatLogs.push({ role: 'system', content, type: 'backend', color });
        this.save(db);
    },
    addTag: function(tagName) {
        let db = this.get();
        db.tags.push({ name: tagName, weight: 15 }); // 默认新标签权重
        db.backendStats.tagsExtracted++;
        this.save(db);
    },
    dispatchToEmployee: function(taskId, title, desc) {
        let db = this.get();
        // 如果是从老板端派发，将状态改为已派发给员工
        let task = db.tasks.find(t => t.id === taskId);
        if(task) task.status = 'dispatched';
        
        // 员工端专用的待办，其实我们用一个统一列表管理更好，但为了演示这里添加新task
        db.tasks.unshift({
            id: 'e_' + Date.now(),
            source: '系统分配',
            type: 'employee',
            title: title,
            goal: desc,
            status: 'pending',
            targetRole: '员工'
        });
        db.backendStats.tasksDispatched++;
        this.save(db);
    },
    addContentScript: function(date, type, title, status, color) {
        let db = this.get();
        db.contentScripts.push({ date, type, title, status, color });
        this.save(db);
    }
};

// 初始化数据库
window.lmDB.init();

// 全局 Toast UI 组件
window.showToast = function(msg, type = 'success') {
    let container = document.getElementById('lm-toast-container');
    if (!container) {
        container = document.createElement('div');
        container.id = 'lm-toast-container';
        container.style.cssText = 'position:fixed; top:20px; left:50%; transform:translateX(-50%); z-index:9999; display:flex; flex-direction:column; gap:10px;';
        document.body.appendChild(container);
    }
    
    let toast = document.createElement('div');
    toast.className = `toast-msg toast-${type}`;
    
    // Icon based on type
    let icon = type === 'success' ? '✅' : type === 'warning' ? '⚠️' : 'ℹ️';
    let color = type === 'success' ? '#10b981' : type === 'warning' ? '#f59e0b' : '#00e5ff';
    let bg = type === 'success' ? 'rgba(16,185,129,0.1)' : type === 'warning' ? 'rgba(245,158,11,0.1)' : 'rgba(0,229,255,0.1)';
    
    toast.style.cssText = `
        background: ${bg}; border: 1px solid ${color}; color: #fff;
        padding: 12px 24px; border-radius: 8px; font-size: 14px; font-weight: 600;
        box-shadow: 0 10px 25px rgba(0,0,0,0.5); backdrop-filter: blur(10px);
        display: flex; align-items: center; gap: 8px;
        animation: toastIn 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
    `;
    toast.innerHTML = `<span>${icon}</span><span>${msg}</span>`;
    
    container.appendChild(toast);
    
    setTimeout(() => {
        toast.style.animation = 'toastOut 0.3s forwards';
        setTimeout(() => toast.remove(), 300);
    }, 3000);
};

// 注入 Toast 动画样式
const style = document.createElement('style');
style.textContent = `
    @keyframes toastIn { from { transform: translateY(-20px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
    @keyframes toastOut { from { transform: translateY(0); opacity: 1; } to { transform: translateY(-20px); opacity: 0; } }
    .btn-loading { position: relative; color: transparent !important; pointer-events: none; }
    .btn-loading::after {
        content: ''; position: absolute; left: 50%; top: 50%; transform: translate(-50%, -50%);
        width: 16px; height: 16px; border: 2px solid #fff; border-top-color: transparent;
        border-radius: 50%; animation: spin 0.8s linear infinite;
    }
    @keyframes spin { to { transform: translate(-50%, -50%) rotate(360deg); } }
`;
document.head.appendChild(style);
