
        let isClassicMode = false;

        function toggleUI() {
            isClassicMode = !isClassicMode;
            const btn = document.getElementById('ui-toggle-btn');
            const genUi = document.getElementById('gen-ui');
            
            if (isClassicMode) {
                btn.innerHTML = '✨ 切换回 AI 分身互动台';
                btn.style.background = 'rgba(0,229,255,0.1)';
                btn.style.color = '#00e5ff';
                btn.style.borderColor = 'var(--primary)';
                genUi.classList.add('classic-mode');
            } else {
                btn.innerHTML = '📊 切换至传统大屏仪表盘';
                btn.style.background = 'rgba(255,255,255,0.1)';
                btn.style.color = '#fff';
                btn.style.borderColor = '#475569';
                genUi.classList.remove('classic-mode');
            }
            
            // 刷新当前选中的菜单视图
            const activeCtx = document.querySelector('.nav-item.active').id.replace('nav-', '');
            switchContext(activeCtx);
        }

        const contexts = {
            'home': {
                title: '总控指挥中心',
                greeting: `老板娘早上好！<br>为了保证今天的最佳经营效果，我为您梳理了<b>【今日作战 4 步向导】</b>：`,
                buttons: [
                    { id: 'btn-h1', text: '📹 生成今日引流短视频', action: 'video', reqMsg: '开始执行第一步：帮我搞定今天的引流短视频。', aiResp: '好的。系统侦测到“入夏美白”需求飙升。请在右侧生成您的数字人播报。' },
                    { id: 'btn-h2', text: '🗂️ 查看全维客户资产大盘', action: 'crm_radar', reqMsg: '我要看所有客户的概况和意向分类。', aiResp: '正在扫描全盘交互数据...已为您生成【AI 客户资产全维大盘】。' },
                    { id: 'btn-h3', text: '🚨 处理王女士退款危机', action: 'crisis', reqMsg: '昨晚那个过敏客诉是怎么回事？', aiResp: 'VIP王女士凌晨因泛红想退款。建议使用升单策略化解，请在右侧审批干预。' },
                    { id: 'btn-h4', text: '👥 派发员工与培训任务', action: 'staff', reqMsg: '安排今天的员工任务。', aiResp: '已生成今日排班表，并自动生成了《术后安抚对练》。' }
                ]
            },
            'content': {
                title: '拓客与内容工场',
                greeting: `已为您切换至【拓客与内容工场】。<br>今天同城“美白”搜索热度上升400%。需要我做什么？`,
                buttons: [
                    { id: 'btn-c1', text: '🔍 探测同城爆款与流量风口', action: 'traffic', reqMsg: '同城最近什么最火？', aiResp: '已生成《入夏美白大作战》全案。预计可带来15-20人到店。' },
                    { id: 'btn-c2', text: '🎬 生成 30 天起盘短视频计划', action: 'video', reqMsg: '结合我的老板娘人设和店里的超皮秒项目，帮我生成接下来的短视频脚本和拍摄计划。', aiResp: '正在融合【您的霸总人设】+【店内超皮秒项目】+【全网百万赞爆款逻辑】...<br>已为您生成【30天 IP 起盘矩阵】与【今日精细化拍摄分镜】。请在右侧查阅并打卡。' }
                ]
            },
            'crm': {
                title: 'AI 客户与店务大盘',
                greeting: `已为您切换至【店务与客户大盘】。<br>这是真正的资产重镇。您可以查看客户大盘分类，或者录入新客。`,
                buttons: [
                    { id: 'btn-m3', text: '📊 展开 AI 客户全维分类大盘', action: 'crm_radar', reqMsg: '帮我把全盘客户调出来，我要看他们的生命周期和信任度。', aiResp: '正在穿透后台数据库...已生成【全息客户资产名册】。您可以在右侧下钻查看任何人的深度画像。' },
                    { id: 'btn-m1', text: '📥 极速录入昨日纸质档案', action: 'crm', reqMsg: '前台有几个新客户的纸质资料，帮我录入。', aiResp: '请在右侧使用 OCR 拍照，或直接提取微信聊天记录秒建档案。' }
                ]
            },
            'staff': {
                title: '员工调度与培训体系',
                greeting: `已为您切换至【员工调度台】。<br>店长芳芳正在忙，新员工小李处于空闲状态，可以安排实战对练。`,
                buttons: [
                    { id: 'btn-s1', text: '📅 查看今日全店排班分布', action: 'staff', reqMsg: '看看今天的排班。', aiResp: '已展示今日排班。店长专注于维系，小李负责履约。' },
                    { id: 'btn-s2', text: '🎯 生成 AI 话术考核下发', action: 'staff', reqMsg: '给大家派发一个应对突发客诉的考核。', aiResp: '已结合昨夜真实工单，生成《紧急安抚对练》。请一键下发。' }
                ]
            },
            'finance': {
                title: '老板参谋 - 财务决策室',
                greeting: `已为您打开【老板参谋】决策室。<br>今日流水表现强劲。您想看点什么深度的洞察？`,
                buttons: [
                    { id: 'btn-f1', text: '💰 拆解今日流水与利润结构', action: 'finance_revenue', reqMsg: '把今天的流水结构拆分一下。', aiResp: '今日流水中 80% 来源于核心卡项的消耗。利润极其健康。' },
                    { id: 'btn-f2', text: '🔮 沙盘推演：全线涨价 10%', action: 'finance_simulate', reqMsg: '如果下个月水光针涨价 10%，客流会下降吗？', aiResp: '系统经过十万次沙盘推演得出结论：流失极低，净利将提升 18%。建议执行。' }
                ]
            }
        };

        const chatHistory = document.getElementById('chat-history');
        const wsTitle = document.getElementById('ws-title');
        const wsContent = document.getElementById('ws-content');
        const topTitle = document.getElementById('top-title');

        window.addEventListener('DOMContentLoaded', () => switchContext('home'));

        function switchContext(ctxName) {
            document.querySelectorAll('.nav-item').forEach(el => el.classList.remove('active'));
            const navObj = document.getElementById(`nav-${ctxName}`);
            if(navObj) navObj.classList.add('active');
            
            const ctx = contexts[ctxName];
            topTitle.innerText = isClassicMode ? `传统视图模式：${ctx.title}` : ctx.title;
            
            chatHistory.innerHTML = '';
            
            if (isClassicMode) {
                // 传统模式：隐藏聊天，直接将工作区撑满，渲染专业级传统仪表盘
                if (ctxName === 'home') renderWorkspace('classic_home');
                else if (ctxName === 'crm') renderWorkspace('crm_radar');
                else if (ctxName === 'content') renderWorkspace('video');
                else if (ctxName === 'staff') renderWorkspace('staff');
                else if (ctxName === 'finance') renderWorkspace('finance_revenue');
            } else {
                // AI 模式：展示聊天向导
                wsTitle.innerHTML = '✨ AI 智能工作台';
                wsContent.innerHTML = `<div style="height: 100%; display: flex; flex-direction: column; justify-content: center; align-items: center; opacity: 0.3;"><svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg><p style="margin-top: 16px; font-size: 13px;">等待执行 ${ctx.title} 领域指令...</p></div>`;

                const msgDiv = document.createElement('div');
                msgDiv.className = 'msg ai';
                let html = `${ctx.greeting}<br><br>`;
                ctx.buttons.forEach(b => {
                    const objStr = encodeURIComponent(JSON.stringify(b));
                    html += `<button class="wizard-btn" id="${b.id}" onclick="triggerAction(this, '${objStr}')">${b.text}</button>`;
                });
                msgDiv.innerHTML = html;
                chatHistory.appendChild(msgDiv);
            }
        }

        function triggerDirectAction(ctxName, actionName, reqMsg, aiResp) {
            if (isClassicMode) {
                switchContext(ctxName);
                renderWorkspace(actionName);
            } else {
                switchContext(ctxName);
                setTimeout(() => {
                    appendMsg(reqMsg, 'user');
                    setTimeout(() => {
                        appendMsg(aiResp, 'ai');
                        renderWorkspace(actionName);
                    }, 500);
                }, 300);
            }
        }

        function triggerAction(btnElement, bStr) {
            const b = JSON.parse(decodeURIComponent(bStr));
            btnElement.classList.add('done');
            appendMsg(b.reqMsg, 'user');
            setTimeout(() => {
                appendMsg(b.aiResp, 'ai');
                renderWorkspace(b.action);
            }, 600);
        }

        function appendMsg(text, type) {
            const div = document.createElement('div');
            div.className = `msg ${type}`;
            div.innerHTML = text;
            chatHistory.appendChild(div);
            chatHistory.scrollTop = chatHistory.scrollHeight;
        }

        function sendCustomMsg() {
            const input = document.getElementById('chat-input');
            const val = input.value.trim();
            if (!val) return;
            appendMsg(val, 'user');
            input.value = '';
            setTimeout(() => appendMsg('收到。正在为您调取深度分析数据，请稍候...', 'ai'), 500);
        }

        function renderWorkspace(type) {
            if (type === 'classic_home') {
                wsTitle.innerHTML = '📊 传统系统总览';
                wsContent.innerHTML = `
                    <div style="display:grid; grid-template-columns: 1fr 1fr; gap:24px; height:100%;">
                        <div class="data-card" style="display:flex; flex-direction:column;">
                            <div style="font-size:16px; font-weight:600; margin-bottom:16px;">📅 待办任务清单</div>
                            <div style="display:flex; justify-content:space-between; padding:16px; border-bottom:1px solid rgba(255,255,255,0.05); cursor:pointer; background:rgba(255,255,255,0.02); border-radius:8px; margin-bottom:8px;" onclick="switchContext('content')"><span>📹 生成今日引流短视频</span><span style="color:var(--primary);">去处理 →</span></div>
                            <div style="display:flex; justify-content:space-between; padding:16px; border-bottom:1px solid rgba(255,255,255,0.05); cursor:pointer; background:rgba(255,255,255,0.02); border-radius:8px; margin-bottom:8px;" onclick="switchContext('crm')"><span>🗂️ 录入昨夜新客档案</span><span style="color:var(--primary);">去处理 →</span></div>
                            <div style="display:flex; justify-content:space-between; padding:16px; cursor:pointer; background:rgba(255,255,255,0.02); border-radius:8px;" onclick="switchContext('staff')"><span>👥 派发今日员工与培训任务</span><span style="color:var(--primary);">去处理 →</span></div>
                        </div>
                        <div class="data-card" style="border-left:4px solid var(--warning); display:flex; flex-direction:column;">
                            <div style="font-size:16px; font-weight:600; margin-bottom:12px; color:var(--warning);">🚨 核心预警工单池</div>
                            <div style="background:rgba(255,51,102,0.05); padding:16px; border-radius:8px; border:1px solid rgba(255,51,102,0.2);">
                                <div style="font-size:14px; font-weight:600; color:#fff; margin-bottom:8px;">工单号：#C-2931 王女士客诉</div>
                                <div style="font-size:12px; color:var(--text-muted); margin-bottom:16px; line-height:1.6;">状态：已由 AI 在凌晨安抚并冻结。<br>风险点：怕毁容、急需退款。<br>潜在损失：¥19,800</div>
                                <button class="btn-primary" style="background:var(--warning); color:#000; border:none; width:100%;" onclick="alert('已强制派发给店长去处理！')">处理：一键派发至店长</button>
                            </div>
                        </div>
                    </div>
                `;
            } else if (type === 'crm_radar') {
                wsTitle.innerHTML = isClassicMode ? '📊 传统 CRM 管理系统' : '📊 客户全维洞察大盘 (CRM名册)';
                wsContent.innerHTML = `
                    <div class="gen-widget" style="height:100%; display:flex; flex-direction:column;">
                        <!-- 分类看板 -->
                        <div style="display:flex; gap:12px; margin-bottom:16px;">
                            <div class="data-card" style="flex:1; text-align:center; padding:12px;"><div style="font-size:20px; font-weight:800; color:#fff;">24</div><div style="font-size:12px; color:var(--text-muted);">🧊 破冰防备期</div></div>
                            <div class="data-card" style="flex:1; text-align:center; padding:12px;"><div style="font-size:20px; font-weight:800; color:#fff;">45</div><div style="font-size:12px; color:var(--text-muted);">🤝 信任建立期</div></div>
                            <div class="data-card" style="flex:1; text-align:center; padding:12px; border-bottom:2px solid var(--warning);"><div style="font-size:20px; font-weight:800; color:var(--warning);">12</div><div style="font-size:12px; color:var(--warning); font-weight:600;">🔥 高促单待割草</div></div>
                            <div class="data-card" style="flex:1; text-align:center; padding:12px;"><div style="font-size:20px; font-weight:800; color:#fff;">3</div><div style="font-size:12px; color:var(--text-muted);">📉 流失预警期</div></div>
                        </div>
                        <!-- 长列表 -->
                        <div class="data-card" style="flex:1; overflow-y:auto; padding:0; background:rgba(0,0,0,0.2);">
                            <table style="width:100%; text-align:left; border-collapse:collapse; font-size:13px; color:#fff;">
                                <thead>
                                    <tr style="border-bottom:1px solid rgba(255,255,255,0.1); color:var(--text-muted); font-size:12px; background:rgba(255,255,255,0.02);">
                                        <th style="padding:12px 16px;">客户概况</th><th style="padding:12px 16px;">AI 信任度</th><th style="padding:12px 16px;">历史消费</th><th style="padding:12px 16px;">系统标签</th><th style="padding:12px 16px; text-align:right;">操作</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr style="border-bottom:1px solid rgba(255,255,255,0.05); cursor:pointer; background:rgba(255,51,102,0.05);" onclick="renderWorkspace('crm_persona_li')">
                                        <td style="padding:12px 16px;"><div style="display:flex; align-items:center; gap:8px;"><div style="width:32px; height:32px; border-radius:50%; background:rgba(255,255,255,0.1); display:flex; align-items:center; justify-content:center;">李</div> <div><div>李小姐 <span style="font-size:10px; background:var(--warning); color:#000; padding:1px 4px; border-radius:4px;">待处理</span></div><div style="font-size:11px; color:var(--text-muted);">138****9921</div></div></div></td>
                                        <td style="padding:12px 16px; color:var(--warning); font-weight:bold;">95% (极高)</td>
                                        <td style="padding:12px 16px;">¥2,400 <span style="font-size:11px; color:var(--text-muted);">(3次基础补水)</span></td>
                                        <td style="padding:12px 16px;"><span style="background:rgba(255,51,102,0.15); color:#fda4af; padding:2px 6px; border-radius:4px; font-size:11px;">容貌极度焦虑</span></td>
                                        <td style="padding:12px 16px; text-align:right;"><button class="btn-primary" style="padding:4px 12px; font-size:12px; background:var(--warning); border:none; color:#000;">查看画像详情</button></td>
                                    </tr>
                                    <tr style="border-bottom:1px solid rgba(255,255,255,0.05); cursor:pointer; transition:0.2s;" onmouseover="this.style.background='rgba(255,255,255,0.02)'" onmouseout="this.style.background='transparent'" onclick="renderWorkspace('crm_persona_zhang')">
                                        <td style="padding:12px 16px;"><div style="display:flex; align-items:center; gap:8px;"><div style="width:32px; height:32px; border-radius:50%; background:rgba(255,255,255,0.1); display:flex; align-items:center; justify-content:center;">张</div> <div><div>张总</div><div style="font-size:11px; color:var(--text-muted);">139****8822</div></div></div></td>
                                        <td style="padding:12px 16px; color:var(--success); font-weight:bold;">88% (稳固)</td>
                                        <td style="padding:12px 16px;">¥58,000 <span style="font-size:11px; color:var(--text-muted);">(抗衰年卡)</span></td>
                                        <td style="padding:12px 16px;"><span style="background:rgba(16,185,129,0.15); color:#6ee7b7; padding:2px 6px; border-radius:4px; font-size:11px;">高净值/时间少</span></td>
                                        <td style="padding:12px 16px; text-align:right;"><button class="btn-primary" style="padding:4px 12px; font-size:12px; background:transparent; border:1px solid var(--primary); color:var(--primary);">查看画像详情</button></td>
                                    </tr>
                                    <tr style="cursor:pointer; transition:0.2s;" onmouseover="this.style.background='rgba(255,255,255,0.02)'" onmouseout="this.style.background='transparent'" onclick="renderWorkspace('crm_persona_wang')">
                                        <td style="padding:12px 16px;"><div style="display:flex; align-items:center; gap:8px;"><div style="width:32px; height:32px; border-radius:50%; background:rgba(255,255,255,0.1); display:flex; align-items:center; justify-content:center;">王</div> <div><div>王女士 <span style="font-size:10px; background:var(--warning); color:#000; padding:1px 4px; border-radius:4px;">高危客诉</span></div><div style="font-size:11px; color:var(--text-muted);">137****1100</div></div></div></td>
                                        <td style="padding:12px 16px; color:var(--warning); font-weight:bold;">15% (信任危机)</td>
                                        <td style="padding:12px 16px;">¥19,800 <span style="font-size:11px; color:var(--text-muted);">(水光针)</span></td>
                                        <td style="padding:12px 16px;"><span style="background:rgba(255,51,102,0.15); color:#fda4af; padding:2px 6px; border-radius:4px; font-size:11px;">怕毁容/急退款</span></td>
                                        <td style="padding:12px 16px; text-align:right;"><button class="btn-primary" style="padding:4px 12px; font-size:12px; background:transparent; border:1px solid var(--warning); color:var(--warning);">查看画像详情</button></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                `;
            } else if (type === 'crm_persona_li') {
                wsTitle.innerHTML = '👤 客户详情与干预操作台';
                wsContent.innerHTML = `
                    <div class="gen-widget" style="height:100%; display:flex; flex-direction:column;">
                        <button style="align-self:flex-start; background:transparent; border:none; color:var(--primary); cursor:pointer; margin-bottom:8px;" onclick="renderWorkspace('crm_radar')">← 返回大盘名册</button>
                        <div class="data-card" style="display:flex; justify-content:space-between; align-items:center; border: 1px solid var(--warning);">
                            <div style="display:flex; align-items:center; gap:12px;">
                                <div style="width:48px; height:48px; border-radius:50%; background:rgba(255,255,255,0.1); display:flex; align-items:center; justify-content:center; font-size:20px;">李</div>
                                <div><div style="font-size:18px; font-weight:600; color:#fff;">李小姐 <span style="font-size:12px; font-weight:normal; color:var(--text-muted);">28岁 / 敏感干皮</span></div><div style="font-size:12px; color:var(--text-muted); margin-top:4px;">意向等级：待割草期 (促单信任度 95%)</div></div>
                            </div>
                        </div>
                        <div class="data-card" style="border-left:3px solid #00e5ff;">
                            <div style="font-size:14px; color:#fff; margin-bottom:12px; font-weight:600; display:flex; justify-content:space-between;">
                                <span>💬 AI 与客户交互全景剖析</span>
                                <span style="font-size:12px; font-weight:normal; color:var(--primary);">累计分析 1,280 条对话</span>
                            </div>
                            
                            <!-- 关键事件时间轴 -->
                            <div style="margin-bottom: 16px;">
                                <div style="font-size:12px; color:#fff; margin-bottom:8px;">📌 核心触点与关键事件提取：</div>
                                <div style="border-left: 2px solid rgba(255,255,255,0.1); padding-left: 12px; margin-left: 6px;">
                                    <div style="position:relative; margin-bottom:12px;">
                                        <div style="position:absolute; left:-17px; top:4px; width:8px; height:8px; border-radius:50%; background:var(--text-muted);"></div>
                                        <div style="font-size:12px; color:var(--text-muted);">[3天前] 凌晨 01:20 情感诉苦</div>
                                        <div style="font-size:13px; color:#fff; margin-top:2px;">提及猫咪生病住院，当晚智能体切换“知心姐姐”人格陪伴 40 分钟。</div>
                                    </div>
                                    <div style="position:relative;">
                                        <div style="position:absolute; left:-17px; top:4px; width:8px; height:8px; border-radius:50%; background:var(--warning);"></div>
                                        <div style="font-size:12px; color:var(--warning);">[昨天] 晚上 22:15 爆发核心诉求</div>
                                        <div style="font-size:13px; color:#fff; margin-top:2px;">发来前男友结婚请柬截图，表现出极度容貌焦虑。<span style="color:var(--warning);">（触发高意向成交信号）</span></div>
                                    </div>
                                </div>
                            </div>

                            <!-- AI 总结与决策建议 -->
                            <div style="background:rgba(0,0,0,0.3); padding:12px; border-radius:8px;">
                                <div style="font-size:12px; color:var(--text-muted); margin-bottom:4px;">🤖 智能体深层洞察与总结：</div>
                                <div style="font-size:13px; color:#fff; line-height:1.6;">
                                    <b>客户痛点：</b>急需在 20 天内实现面部提亮和紧致。<br>
                                    <b>抗拒点：</b>近期宠物开销大，对单价 1 万元以上项目可能产生抗拒。<br>
                                    <span style="color:var(--warning); font-weight:600;">促单策略：避开推销年卡。用“艳压前男友”的话术，主推单次见效极快的【超皮秒紧急焕颜卡 (¥3980)】，预计成交率 95%。</span>
                                </div>
                            </div>
                        </div>
                        <div class="data-card" style="flex:1; display:flex; flex-direction:column; background:linear-gradient(135deg, rgba(255,51,102,0.1), rgba(0,0,0,0)); border:1px solid rgba(255,51,102,0.2);">
                            <div style="font-size:13px; color:var(--text-muted); margin-bottom:8px;">⚠️ 业务状态：当前客服仅做安抚，未完成闭环营销。</div>
                            <div style="font-size:14px; font-weight:600; color:#fff; margin-bottom:8px;">操作台：一键下发指令</div>
                            <textarea style="width:100%; flex:1; background:rgba(0,0,0,0.5); border:1px solid rgba(255,255,255,0.2); border-radius:8px; color:#fff; padding:12px; font-size:13px; resize:none; margin-bottom:12px; font-family:'Inter', sans-serif;">马上给她发【超皮秒紧急焕颜卡】的拼团链接。第一句话先关心她的猫咪病情拉近关系，第二句话暗示做完这个能绝对艳压全场，帮她找回场子！</textarea>
                            <button class="btn-primary" style="width:100%; padding:12px; background:var(--warning); color:#000; font-weight:bold; border:none; font-size:14px;" onclick="alert('执行成功！系统已将任务指派执行！')">🔥 下发干预指令</button>
                        </div>
                    </div>
                `;
            } else if (type === 'crm_persona_zhang') {
                wsTitle.innerHTML = '👤 客户详情与干预操作台';
                wsContent.innerHTML = `
                    <div class="gen-widget" style="height:100%; display:flex; flex-direction:column;">
                        <button style="align-self:flex-start; background:transparent; border:none; color:var(--primary); cursor:pointer; margin-bottom:8px;" onclick="renderWorkspace('crm_radar')">← 返回大盘名册</button>
                        <div class="data-card" style="display:flex; justify-content:space-between; align-items:center; border: 1px solid var(--success);">
                            <div style="display:flex; align-items:center; gap:12px;">
                                <div style="width:48px; height:48px; border-radius:50%; background:rgba(255,255,255,0.1); display:flex; align-items:center; justify-content:center; font-size:20px;">张</div>
                                <div><div style="font-size:18px; font-weight:600; color:#fff;">张总 <span style="font-size:12px; font-weight:normal; color:var(--text-muted);">45岁 / 紧致抗衰</span></div><div style="font-size:12px; color:var(--text-muted); margin-top:4px;">意向等级：高价值稳固期 (信任度 88%)</div></div>
                            </div>
                        </div>
                        <div class="data-card" style="border-left:3px solid #00e5ff;">
                            <div style="font-size:14px; color:#fff; margin-bottom:12px; font-weight:600; display:flex; justify-content:space-between;">
                                <span>💬 AI 与客户交互全景剖析</span>
                                <span style="font-size:12px; font-weight:normal; color:var(--primary);">累计分析 320 条对话</span>
                            </div>
                            <!-- 关键事件时间轴 -->
                            <div style="margin-bottom: 16px;">
                                <div style="font-size:12px; color:#fff; margin-bottom:8px;">📌 核心触点与关键事件提取：</div>
                                <div style="border-left: 2px solid rgba(255,255,255,0.1); padding-left: 12px; margin-left: 6px;">
                                    <div style="position:relative; margin-bottom:12px;">
                                        <div style="position:absolute; left:-17px; top:4px; width:8px; height:8px; border-radius:50%; background:var(--text-muted);"></div>
                                        <div style="font-size:12px; color:var(--text-muted);">[2天前] 下午 14:30 快速咨询</div>
                                        <div style="font-size:13px; color:#fff; margin-top:2px;">询问是否有不用恢复期的抗衰仪器。AI 推荐了半岛超声炮，客户未表态。</div>
                                    </div>
                                    <div style="position:relative;">
                                        <div style="position:absolute; left:-17px; top:4px; width:8px; height:8px; border-radius:50%; background:var(--warning);"></div>
                                        <div style="font-size:12px; color:var(--warning);">[今天] 上午 09:15 透露商务行程</div>
                                        <div style="font-size:13px; color:#fff; margin-top:2px;">提及下周三要去北京参加重要行业峰会，感觉最近熬夜脸有点垮。<span style="color:var(--warning);">（极强的升单契机）</span></div>
                                    </div>
                                </div>
                            </div>
                            <!-- AI 总结 -->
                            <div style="background:rgba(0,0,0,0.3); padding:12px; border-radius:8px;">
                                <div style="font-size:12px; color:var(--text-muted); margin-bottom:4px;">🤖 智能体深层洞察与总结：</div>
                                <div style="font-size:13px; color:#fff; line-height:1.6;">
                                    <b>客户痛点：</b>需要极具效率的抗衰保养，绝不能有红肿期影响开会。<br>
                                    <b>抗拒点：</b>极度缺乏时间，讨厌繁琐的推销。<br>
                                    <span style="color:var(--warning); font-weight:600;">促单策略：直接安排“午休抗衰”绿色通道。推销无需恢复期的高端线粒体焕活项目。</span>
                                </div>
                            </div>
                        </div>
                        <div class="data-card" style="flex:1; display:flex; flex-direction:column; background:linear-gradient(135deg, rgba(255,51,102,0.1), rgba(0,0,0,0)); border:1px solid rgba(255,51,102,0.2);">
                            <div style="font-size:14px; font-weight:600; color:#fff; margin-bottom:8px;">上帝之手：老板娘一键派发特权</div>
                            <textarea style="width:100%; flex:1; background:rgba(0,0,0,0.5); border:1px solid rgba(255,255,255,0.2); border-radius:8px; color:#fff; padding:12px; font-size:13px; resize:none; margin-bottom:12px; font-family:'Inter', sans-serif;">给张总留好明天中午的 VIP 房间。跟他说：“张总，知道您下周峰会重要，特意给您加急调了台最新无创抗衰仪器，午休做完直接回去开会，绝不耽误事。”</textarea>
                            <button class="btn-primary" style="width:100%; padding:12px; background:var(--success); color:#fff; font-weight:bold; border:none; font-size:14px;" onclick="alert('执行成功！智能体已按此口吻发送给张总！')">✨ 下发高端营销指令</button>
                        </div>
                    </div>
                `;
            } else if (type === 'crm_persona_wang') {
                wsTitle.innerHTML = '👤 客户详情与干预操作台';
                wsContent.innerHTML = `
                    <div class="gen-widget" style="height:100%; display:flex; flex-direction:column;">
                        <button style="align-self:flex-start; background:transparent; border:none; color:var(--primary); cursor:pointer; margin-bottom:8px;" onclick="renderWorkspace('crm_radar')">← 返回大盘名册</button>
                        <div class="data-card" style="display:flex; justify-content:space-between; align-items:center; border: 1px solid var(--warning);">
                            <div style="display:flex; align-items:center; gap:12px;">
                                <div style="width:48px; height:48px; border-radius:50%; background:rgba(255,255,255,0.1); display:flex; align-items:center; justify-content:center; font-size:20px;">王</div>
                                <div><div style="font-size:18px; font-weight:600; color:#fff;">王女士 <span style="font-size:12px; background:var(--warning); color:#000; padding:2px 6px; border-radius:4px;">高危客诉介入中</span></div><div style="font-size:12px; color:var(--text-muted); margin-top:4px;">意向等级：信任危机期 (信任度跌至 15%)</div></div>
                            </div>
                        </div>
                        <div class="data-card" style="border-left:3px solid #00e5ff;">
                            <div style="font-size:14px; color:#fff; margin-bottom:12px; font-weight:600; display:flex; justify-content:space-between;">
                                <span>💬 危机发生始末记录</span>
                            </div>
                            <!-- 关键事件时间轴 -->
                            <div style="margin-bottom: 16px;">
                                <div style="font-size:12px; color:#fff; margin-bottom:8px;">📌 核心触点与关键事件提取：</div>
                                <div style="border-left: 2px solid rgba(255,255,255,0.1); padding-left: 12px; margin-left: 6px;">
                                    <div style="position:relative; margin-bottom:12px;">
                                        <div style="position:absolute; left:-17px; top:4px; width:8px; height:8px; border-radius:50%; background:var(--warning);"></div>
                                        <div style="font-size:12px; color:var(--warning);">[今天] 凌晨 02:15 爆发剧烈冲突</div>
                                        <div style="font-size:13px; color:#fff; margin-top:2px;">连发 5 张面部泛红照片，连发 30 条语音质问产品是否伪劣，扬言要去小红书曝光。</div>
                                    </div>
                                    <div style="position:relative;">
                                        <div style="position:absolute; left:-17px; top:4px; width:8px; height:8px; border-radius:50%; background:var(--success);"></div>
                                        <div style="font-size:12px; color:var(--success);">[今天] 凌晨 02:18 智能体紧急安抚</div>
                                        <div style="font-size:13px; color:#fff; margin-top:2px;">智能体迅速锁单，并生成《过敏体质修护术后须知》，承诺今早由店长亲自接待补偿，成功稳住客户情绪。</div>
                                    </div>
                                </div>
                            </div>
                            <!-- AI 总结 -->
                            <div style="background:rgba(0,0,0,0.3); padding:12px; border-radius:8px;">
                                <div style="font-size:12px; color:var(--text-muted); margin-bottom:4px;">🤖 危机公关处理建议：</div>
                                <div style="font-size:13px; color:#fff; line-height:1.6;">
                                    <b>客户痛点：</b>极度恐惧毁容，安全感降至冰点。<br>
                                    <span style="color:var(--warning); font-weight:600;">反杀策略：这不仅是退款危机，更是建立“极致服务口碑”的绝佳节点。建议立刻赠送万元级的抗敏修复导入项目，用专业度让她产生极强的亏欠感与依赖感。</span>
                                </div>
                            </div>
                        </div>
                        <div class="data-card" style="flex:1; display:flex; flex-direction:column; background:linear-gradient(135deg, rgba(255,51,102,0.1), rgba(0,0,0,0)); border:1px solid rgba(255,51,102,0.2);">
                            <div style="font-size:14px; font-weight:600; color:#fff; margin-bottom:8px;">上帝之手：化解危机指令</div>
                            <textarea style="width:100%; flex:1; background:rgba(0,0,0,0.5); border:1px solid rgba(255,255,255,0.2); border-radius:8px; color:#fff; padding:12px; font-size:13px; resize:none; margin-bottom:12px; font-family:'Inter', sans-serif;">立刻让芳芳（店长）接管。跟王女士说：“王姐，老板娘凌晨看到了心疼坏了，今天把全店最好的修复仪器给您留着，免费做全套，绝不能让您受一点委屈。”</textarea>
                            <button class="btn-primary" style="width:100%; padding:12px; background:var(--warning); color:#000; font-weight:bold; border:none; font-size:14px;" onclick="alert('执行成功！工单已强制流转至店长芳芳，并附带了该话术！')">🚨 下发紧急补救与反杀指令</button>
                        </div>
                    </div>
                `;
            } else if (type === 'video') {
                wsTitle.innerHTML = isClassicMode ? '📹 传统视图：短视频排期日历' : '📹 AI 导演与 IP 孵化工厂';
                wsContent.innerHTML = `
                    <div class="gen-widget" style="height:100%; display:flex; flex-direction:column;">
                        <!-- 核心信息融合池 -->
                        <div class="data-card" style="display:flex; justify-content:space-between; align-items:center; border: 1px solid var(--success); margin-bottom: 16px; background:rgba(16,185,129,0.05);">
                            <div style="display:flex; gap: 16px;">
                                <div style="text-align:center;"><div style="font-size:24px;">🌐</div><div style="font-size:11px; color:var(--text-muted); margin-top:4px;">全网热点库</div></div>
                                <div style="color:var(--text-muted); font-size:16px; align-self:center;">+</div>
                                <div style="text-align:center;"><div style="font-size:24px;">👩🏻‍💼</div><div style="font-size:11px; color:var(--text-muted); margin-top:4px;">老板娘人设</div></div>
                                <div style="color:var(--text-muted); font-size:16px; align-self:center;">+</div>
                                <div style="text-align:center;"><div style="font-size:24px;">🏢</div><div style="font-size:11px; color:var(--text-muted); margin-top:4px;">门店项目库</div></div>
                            </div>
                            <div style="text-align:right;">
                                <div style="font-size:12px; color:var(--text-muted); margin-bottom:4px;">AI 智能熔炉自动提取核心公式：</div>
                                <div style="font-size:14px; font-weight:600; color:var(--success);">“独立清醒女老板 x 容貌反击 x 核心仪器”</div>
                            </div>
                        </div>

                        <div style="display:flex; gap:16px; flex:1; min-height:0;">
                            <!-- 左侧：30天绿色日历表 -->
                            <div class="data-card" style="flex:1.2; display:flex; flex-direction:column; padding:16px;">
                                <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:16px;">
                                    <div style="font-size:14px; color:#fff; font-weight:600;">📅 30天 IP 拍摄日历表 (6月)</div>
                                    <div style="font-size:12px; color:var(--text-muted);"><span style="color:var(--success);">■</span> 已完成 <span style="color:rgba(16,185,129,0.3);">■</span> 待完成</div>
                                </div>
                                
                                <div style="display:grid; grid-template-columns: repeat(7, 1fr); gap:8px; text-align:center; font-size:12px; color:var(--text-muted); margin-bottom:8px;">
                                    <div>一</div><div>二</div><div>三</div><div>四</div><div>五</div><div>六</div><div>日</div>
                                </div>
                                <div id="video-calendar-grid" style="display:grid; grid-template-columns: repeat(7, 1fr); gap:8px; flex:1; overflow-y:auto; padding-right:4px;">
                                    <div onclick="document.getElementById('video-detail-panel').innerHTML=window._vidDay1" style="cursor:pointer; background:rgba(16,185,129,0.15); border:1px solid var(--success); border-radius:4px; display:flex; flex-direction:column; justify-content:center; align-items:center; padding:12px 0; color:var(--success); transition:0.2s;" onmouseover="this.style.background='rgba(16,185,129,0.25)'" onmouseout="this.style.background='rgba(16,185,129,0.15)'">
                                        <div style="font-size:16px; font-weight:bold;">1</div>
                                        <div style="font-size:11px; margin-top:4px;">✅ 已完成</div>
                                    </div>
                                    <div onclick="document.getElementById('video-detail-panel').innerHTML=window._vidDay2" style="cursor:pointer; background:var(--success); border:1px solid #fff; box-shadow:0 0 10px rgba(16,185,129,0.5); border-radius:4px; display:flex; flex-direction:column; justify-content:center; align-items:center; padding:12px 0; color:#000; transition:0.2s;" onmouseover="this.style.transform='scale(1.05)'" onmouseout="this.style.transform='scale(1)'">
                                        <div style="font-size:16px; font-weight:bold;">2</div>
                                        <div style="font-size:11px; margin-top:4px;">🎬 今日待拍</div>
                                    </div>
                                    <div onclick="document.getElementById('video-detail-panel').innerHTML=window._vidDay3" style="cursor:pointer; background:rgba(255,255,255,0.05); border:1px dashed rgba(16,185,129,0.4); border-radius:4px; display:flex; flex-direction:column; justify-content:center; align-items:center; padding:12px 0; color:var(--text-muted); transition:0.2s;" onmouseover="this.style.background='rgba(255,255,255,0.1)'" onmouseout="this.style.background='rgba(255,255,255,0.05)'">
                                        <div style="font-size:16px; font-weight:bold;">3</div>
                                        <div style="font-size:11px; margin-top:4px; color:rgba(16,185,129,0.5);">❗ 待排期</div>
                                    </div>
                                    ${Array.from({length: 27}, (_, i) => `
                                        <div style="background:rgba(255,255,255,0.02); border:1px solid rgba(255,255,255,0.05); border-radius:4px; display:flex; flex-direction:column; justify-content:center; align-items:center; padding:12px 0; color:rgba(255,255,255,0.2);">
                                            <div style="font-size:16px; font-weight:bold;">${i+4}</div>
                                            <div style="font-size:11px; margin-top:4px;">❗ 待定</div>
                                        </div>
                                    `).join('')}
                                </div>
                            </div>

                            <!-- 右侧：详情展示板 (动态替换) -->
                            <div class="data-card" style="flex:1.8; display:flex; flex-direction:column; overflow-y:auto; padding:16px;" id="video-detail-panel">
                                <!-- Default to Day 2 loaded by setTimeout -->
                            </div>
                        </div>
                    </div>
                `;

                // Scripts for dynamic content
                window._vidDay1 = `
                    <div style="font-size:16px; color:var(--success); font-weight:600; border-bottom:1px solid rgba(255,255,255,0.1); padding-bottom:12px; margin-bottom:16px; display:flex; align-items:center; gap:8px;">
                        ✅ Day 1: 老板娘的下班日常 (已完成)
                    </div>
                    <div style="display:flex; flex-direction:column; align-items:center; justify-content:center; flex:1; border:1px dashed rgba(16,185,129,0.3); border-radius:8px; background:rgba(0,0,0,0.2); padding:20px; text-align:center;">
                        <div style="width:120px; height:80px; background:#111; border:1px solid #333; border-radius:4px; display:flex; justify-content:center; align-items:center; margin-bottom:16px; position:relative; overflow:hidden;">
                            <div style="position:absolute; width:100%; height:100%; background:linear-gradient(45deg, rgba(16,185,129,0.2), transparent);"></div>
                            <div style="width:0; height:0; border-top:10px solid transparent; border-bottom:10px solid transparent; border-left:15px solid var(--success); cursor:pointer; z-index:2;"></div>
                            <div style="position:absolute; bottom:4px; right:4px; font-size:10px; background:rgba(0,0,0,0.8); padding:2px 4px; border-radius:2px; z-index:2;">00:45</div>
                        </div>
                        <div style="font-size:14px; color:#fff; margin-bottom:8px;">✅ 任务已于 6月1日 18:30 完成</div>
                        <div style="font-size:12px; color:var(--text-muted); margin-bottom:20px;">🔗 视频素材已上传：老板娘下班日常_v1_final.mp4</div>
                        
                        <div style="background:rgba(16,185,129,0.1); padding:12px; border-radius:4px; width:100%; text-align:left; font-size:12px;">
                            <div style="color:var(--success); font-weight:bold; margin-bottom:4px;">流转状态：</div>
                            <div>- 视频素材就绪，已打卡。</div>
                            <div>- 正在等待 AI 智能剪辑系统提取核心高光片段...</div>
                            <div>- 预计明日早 8:00 自动推流至：抖音、小红书。</div>
                        </div>
                    </div>
                `;

                window._vidDay2 = `
                    <div style="font-size:16px; color:#fff; font-weight:600; border-bottom:1px solid rgba(255,255,255,0.1); padding-bottom:12px; margin-bottom:16px;">🎬 Day 2: 闺蜜被渣带她变美 (今日待拍)</div>
                    
                    <div style="display:flex; gap:12px; margin-bottom:20px;">
                        <span style="font-size:11px; background:rgba(255,255,255,0.1); padding:4px 8px; border-radius:4px;">机位：平视/跟拍</span>
                        <span style="font-size:11px; background:rgba(255,255,255,0.1); padding:4px 8px; border-radius:4px;">时长预估：45秒</span>
                        <span style="font-size:11px; background:rgba(255,255,255,0.1); padding:4px 8px; border-radius:4px; color:var(--success);">爆款因子：情感共鸣 + 容貌反击</span>
                    </div>

                    <table style="width:100%; text-align:left; border-collapse:collapse; font-size:12px; color:#fff; margin-bottom:20px;">
                        <thead><tr style="border-bottom:1px solid rgba(255,255,255,0.2); color:var(--success);"><th style="padding:8px; width:25%;">分镜/运镜提示</th><th style="padding:8px;">口播文案 & 动作要求</th></tr></thead>
                        <tbody>
                            <tr style="border-bottom:1px dashed rgba(255,255,255,0.1);">
                                <td style="padding:12px 8px; color:var(--text-muted); vertical-align:top;"><b>0-3秒 (黄金前三秒)</b><br>推镜头入画，表情严肃</td>
                                <td style="padding:12px 8px; line-height:1.6;"><b>(重重拍桌子)</b> "为了个渣男把自己哭成黄脸婆，值得吗？姐妹们！"</td>
                            </tr>
                            <tr style="border-bottom:1px dashed rgba(255,255,255,0.1);">
                                <td style="padding:12px 8px; color:var(--text-muted); vertical-align:top;"><b>4-15秒</b><br>跟拍摄影机随走动，走向治疗室</td>
                                <td style="padding:12px 8px; line-height:1.6;"><b>(边走边带风)</b> "今天必须带我发小体验咱店里的【超皮秒黑金版】。最好的报复不是原谅，而是你比原来更漂亮、更发光！"</td>
                            </tr>
                            <tr>
                                <td style="padding:12px 8px; color:var(--text-muted); vertical-align:top;"><b>16-45秒</b><br>特写仪器与发小面部</td>
                                <td style="padding:12px 8px; line-height:1.6;"><b>(配合操作师打光)</b> "大家看，这个特有的波长能直达真皮层，把那些暗沉直接击碎。女人，一定要学会投资自己..."</td>
                            </tr>
                        </tbody>
                    </table>

                    <div style="display:flex; gap:12px; margin-top:auto;">
                        <button class="btn-primary" style="flex:1; background:transparent; border:1px solid var(--success); color:var(--success); padding:10px; font-weight:600;" onclick="alert('提示词与分镜脚本已下发至相关人员手机提词器设备！')">📱 发送至手机提词器</button>
                        <button class="btn-primary" style="flex:1; background:var(--success); color:#000; font-weight:bold; padding:10px; border:none; box-shadow:0 0 10px rgba(16,185,129,0.3);" onclick="document.getElementById('video-detail-panel').innerHTML=window._vidDay1; alert('文件上传成功！任务打卡闭环。')">📤 上传已拍视频并完成打卡</button>
                    </div>
                `;

                window._vidDay3 = `
                    <div style="font-size:16px; color:#fff; font-weight:600; border-bottom:1px solid rgba(255,255,255,0.1); padding-bottom:12px; margin-bottom:16px;">❗ Day 3: 揭秘医美行业的避坑指南 (待拍摄)</div>
                    <div style="font-size:13px; color:var(--text-muted); line-height:1.8; margin-bottom:20px;">
                        ⚠️ 系统提示：该任务计划于明日（6月3日）执行。<br>
                        文案大纲预生成完成，侧重于“避开无效美白坑”，建立老板娘的专家人设。
                    </div>
                    <div style="opacity:0.4; pointer-events:none;">
                        <table style="width:100%; text-align:left; border-collapse:collapse; font-size:12px; color:#fff;">
                            <thead><tr style="border-bottom:1px solid rgba(255,255,255,0.2); color:var(--success);"><th style="padding:8px; width:25%;">分镜预演</th><th style="padding:8px;">大纲主旨</th></tr></thead>
                            <tbody>
                                <tr style="border-bottom:1px dashed rgba(255,255,255,0.1);">
                                    <td style="padding:12px 8px;">仪器横评比对</td>
                                    <td style="padding:12px 8px;">揭露低价水光的套路，为什么打完脸更干。展示正规军的透明度。</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div style="margin-top:auto;">
                        <button class="btn-primary" style="width:100%; background:transparent; border:1px solid var(--text-muted); color:var(--text-muted); padding:10px; cursor:not-allowed;" onclick="alert('文案尚未最终定稿且未到执行日，强行提前打卡可能会影响矩阵连贯算法。')">🎬 我要提前拍摄并打卡</button>
                    </div>
                `;

                // Set initial content to Day 2
                setTimeout(() => { 
                    const panel = document.getElementById('video-detail-panel');
                    if(panel) panel.innerHTML = window._vidDay2; 
                }, 10);

            } else if (type === 'crm') {
                wsTitle.innerHTML = '🗂️ 传统视图：档案录入工具';
                wsContent.innerHTML = `<div class="gen-widget"><div style="display:grid; grid-template-columns: 1fr 1fr; gap:16px;"><div class="data-card" style="text-align:center; border: 1px dashed var(--primary);"><div style="font-size:32px;">📸</div><div style="font-size:14px; color:#fff;">拍照识别表单</div></div><div class="data-card" style="text-align:center; border: 1px dashed var(--success);"><div style="font-size:32px;">🤖</div><div style="font-size:14px; color:#fff;">系统日志拉取同步</div></div></div></div>`;
            } else if (type === 'crisis') {
                wsTitle.innerHTML = '🚨 传统视图：客诉工单处理';
                wsContent.innerHTML = `<div class="gen-widget"><div class="data-card" style="border-left:4px solid var(--warning);"><div style="font-size:14px; color:#fff;">工单分析详情</div><div style="font-size:13px; color:var(--text-muted);">关联客户：王女士 <br>风险词条：<span style="color:var(--warning);">极度怕毁容</span></div></div><div class="data-card"><div style="font-size:14px; color:var(--primary);">标准处理预案</div><div style="font-size:13px; color:#fff;">由店长对接并免费赠送修复项目。</div></div><button class="btn-primary" style="width:100%;">✅ 提交流转表单</button></div>`;
            } else if (type === 'staff') {
                wsTitle.innerHTML = '👥 传统视图：排班与培训表单';
                wsContent.innerHTML = `<div class="gen-widget"><div class="data-card"><div style="font-size:14px; color:#fff; margin-bottom:12px;">今日全店人员状态</div><div style="font-size:13px; color:var(--text-muted);">芳芳: [处理客诉]<br>小李: [空闲]</div></div><div class="data-card"><div style="font-size:14px; color:#fff;">在线考核派发</div><div style="font-size:12px; color:var(--text-muted); margin-bottom:12px;">待派发题库：《水光针术后安抚》</div><button class="btn-primary" style="width:100%; background:transparent; border:1px solid var(--primary); color:var(--primary);">一键分发试卷</button></div></div>`;
            } else if (type === 'finance_revenue') {
                wsTitle.innerHTML = isClassicMode ? '💰 传统视图：财务流水深度拆解' : '💰 AI 参谋：今日流水结构透视';
                wsContent.innerHTML = `
                    <div class="gen-widget" style="height:100%; display:flex; flex-direction:column;">
                        
                        <!-- 核心指标盘 -->
                        <div style="display:flex; gap:16px; margin-bottom:16px;">
                            <div class="data-card" style="flex:1; text-align:center; padding:16px;">
                                <div style="font-size:12px; color:var(--text-muted);">今日总营收</div>
                                <div style="font-size:24px; font-weight:800; color:#fff; margin-top:4px;">¥12,850</div>
                                <div style="font-size:12px; color:var(--success); margin-top:4px;">环比昨日 +15.2% ↑</div>
                            </div>
                            <div class="data-card" style="flex:1; text-align:center; padding:16px;">
                                <div style="font-size:12px; color:var(--text-muted);">综合净利率预估</div>
                                <div style="font-size:24px; font-weight:800; color:var(--warning); margin-top:4px;">68.5%</div>
                                <div style="font-size:12px; color:var(--text-muted); margin-top:4px;">远超行业均值 45%</div>
                            </div>
                            <div class="data-card" style="flex:1; text-align:center; padding:16px;">
                                <div style="font-size:12px; color:var(--text-muted);">营收健康指数</div>
                                <div style="font-size:24px; font-weight:800; color:var(--primary); margin-top:4px;">A+ (极优)</div>
                                <div style="font-size:12px; color:var(--text-muted); margin-top:4px;">高价值抗衰卡项占比达标</div>
                            </div>
                        </div>

                        <!-- 结构可视化柱状图带数据标签 -->
                        <div class="data-card" style="margin-bottom:16px;">
                            <div style="font-size:14px; font-weight:600; color:#fff; margin-bottom:16px;">📊 营收结构分布图</div>
                            <div style="display:flex; align-items:flex-end; gap:24px; height:180px; padding:0 20px; border-bottom:1px solid rgba(255,255,255,0.1);">
                                
                                <div style="flex:1; height:100%; display:flex; flex-direction:column; justify-content:flex-end; align-items:center;">
                                    <div style="font-size:14px; font-weight:bold; color:var(--primary); margin-bottom:8px;">¥8,500 <span style="font-size:11px; font-weight:normal; color:#fff;">(66%)</span></div>
                                    <div style="width:100%; background:linear-gradient(to top, rgba(0,229,255,0.2), var(--primary)); height: 66%; border-radius:4px 4px 0 0;"></div>
                                    <div style="margin-top:12px; font-size:12px; color:var(--text-muted); text-align:center;">核心品项<br>(抗衰/高客单)</div>
                                </div>
                                
                                <div style="flex:1; height:100%; display:flex; flex-direction:column; justify-content:flex-end; align-items:center;">
                                    <div style="font-size:14px; font-weight:bold; color:var(--success); margin-bottom:8px;">¥3,200 <span style="font-size:11px; font-weight:normal; color:#fff;">(25%)</span></div>
                                    <div style="width:100%; background:linear-gradient(to top, rgba(16,185,129,0.2), var(--success)); height: 25%; border-radius:4px 4px 0 0;"></div>
                                    <div style="margin-top:12px; font-size:12px; color:var(--text-muted); text-align:center;">拓客引流项<br>(基础水光/轻医美)</div>
                                </div>
                                
                                <div style="flex:1; height:100%; display:flex; flex-direction:column; justify-content:flex-end; align-items:center;">
                                    <div style="font-size:14px; font-weight:bold; color:var(--warning); margin-bottom:8px;">¥1,150 <span style="font-size:11px; font-weight:normal; color:#fff;">(9%)</span></div>
                                    <div style="width:100%; background:linear-gradient(to top, rgba(251,191,36,0.2), var(--warning)); height: 9%; border-radius:4px 4px 0 0;"></div>
                                    <div style="margin-top:12px; font-size:12px; color:var(--text-muted); text-align:center;">家居周边<br>(护肤/零售)</div>
                                </div>
                                
                            </div>
                        </div>

                        <!-- AI 深度洞察 -->
                        <div class="data-card" style="border-left:3px solid var(--primary); background:rgba(0,229,255,0.05); flex:1;">
                            <div style="font-size:14px; font-weight:600; color:#fff; margin-bottom:8px;">🤖 AI 参谋深度洞察：</div>
                            <div style="font-size:13px; color:var(--text-muted); line-height:1.8;">
                                1. <b>高净利结构极佳</b>：今日流水中有 66% 来源于高毛利的“核心抗衰卡项”。说明前端拓客后，门店的<b>升单转化能力非常强悍</b>。<br>
                                2. <b>发现隐患</b>：拓客引流项占比较低（仅25%），这意味着“拉新”漏斗有些干涸。若不及时补充新流量，下周高客单转化可能面临断层。<br>
                                <span style="color:var(--primary); font-weight:600;">行动建议：立刻前往【拓客与内容工场】，启动预案好的《夏季美白短视频营销计划》以补充新鲜客流。</span>
                            </div>
                        </div>
                    </div>
                `;
            } else if (type === 'finance_simulate') {
                wsTitle.innerHTML = isClassicMode ? '🔮 传统视图：BI 涨价沙盘推演报告' : '🔮 老板参谋：全线涨价 10% 沙盘推演';
                wsContent.innerHTML = `
                    <div class="gen-widget" style="height:100%; display:flex; flex-direction:column;">
                        
                        <div class="data-card" style="border: 1px solid var(--warning); background:rgba(251,191,36,0.05); margin-bottom:16px;">
                            <div style="font-size:16px; font-weight:600; color:var(--warning); margin-bottom:8px;">🎯 核心结论：强烈建议执行涨价</div>
                            <div style="font-size:13px; color:#fff; line-height:1.6;">
                                系统经过对本店 3000 名客户画像、近一年消费习惯以及同城竞对价格的 <b>10万次蒙特卡洛模拟</b>，得出推演结果：<br>
                                全线涨价 10% 将导致边缘价格敏感客户流失，但核心净利将获得大幅跃升。
                            </div>
                        </div>

                        <div style="display:flex; gap:16px; margin-bottom:16px;">
                            <div class="data-card" style="flex:1;">
                                <div style="font-size:13px; color:var(--text-muted); margin-bottom:8px;">预计客流量变化</div>
                                <div style="font-size:24px; font-weight:bold; color:#fda4af;">- 4.5% ↓</div>
                                <div style="font-size:12px; color:var(--text-muted); margin-top:8px;">主要是只做“特价引流”的薅羊毛客流失，对门店生态影响极小。</div>
                            </div>
                            <div class="data-card" style="flex:1;">
                                <div style="font-size:13px; color:var(--text-muted); margin-bottom:8px;">预计净利润变化</div>
                                <div style="font-size:24px; font-weight:bold; color:var(--success);">+ 18.2% ↑</div>
                                <div style="font-size:12px; color:var(--text-muted); margin-top:8px;">由于门店 80% 营收由高净值客户（如张总）贡献，他们对 10% 涨幅完全脱敏。</div>
                            </div>
                            <div class="data-card" style="flex:1;">
                                <div style="font-size:13px; color:var(--text-muted); margin-bottom:8px;">员工排班负荷</div>
                                <div style="font-size:24px; font-weight:bold; color:var(--primary);">- 10% ↓</div>
                                <div style="font-size:12px; color:var(--text-muted); margin-top:8px;">员工接待低价值客户的时间减少，有更多精力服务 VIP，服务体验进一步提升。</div>
                            </div>
                        </div>

                        <div class="data-card" style="flex:1; border-top: 3px solid var(--primary); display:flex; flex-direction:column;">
                            <div style="font-size:14px; font-weight:600; color:#fff; margin-bottom:12px;">✅ 落地自动执行方案</div>
                            <ul style="font-size:13px; color:var(--text-muted); line-height:2; margin:0; padding-left:20px;">
                                <li><b>第一步：</b>智能体将于今晚 20:00 自动向所有 VIP 发送“老客锁价年卡邀约”（预估可提前回笼资金 20 万）。</li>
                                <li><b>第二步：</b>明晨 00:00 自动更新所有线上平台的美团/大众点评团购价格。</li>
                                <li><b>第三步：</b>即刻向全体员工下发《涨价应对与客诉化解》的话术培训题库。</li>
                            </ul>
                            <button class="btn-primary" style="width:100%; padding:12px; background:var(--primary); color:#000; font-weight:bold; border:none; font-size:14px; margin-top:auto;" onclick="alert('执行成功！沙盘计划已转为真实任务流下发。')">🚀 确认无误，下令全线涨价并启动预案</button>
                        </div>
                    </div>
                `;
            } else if (type === 'traffic') {
                wsTitle.innerHTML = '🔮 AI 深度分析推演';
                wsContent.innerHTML = `<div class="gen-widget"><div class="data-card"><div style="font-size:14px; color:#fff;">流量分析报告已生成</div><div style="font-size:13px; color:var(--text-muted); margin-top:8px;">同城“美白”关键词热度上升 400%，建议马上开拍对应短视频截流。</div></div></div>`;
            }
        }
    