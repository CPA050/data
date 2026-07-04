/* ==========================================
   🔮 左下角固定悬浮玻璃水晶球（重构升级高级触感）
   ========================================== */
.glass-trigger {
    position: fixed;
    left: 24px;
    bottom: 24px;
    width: 52px;
    height: 52px;
    border-radius: 50%;
    
    /* 极致细腻的水晶渐变底色 */
    background: linear-gradient(135deg, rgba(255, 255, 255, 0.8) 0%, rgba(225, 235, 255, 0.55) 100%) !important;
    border: 1px solid rgba(255, 255, 255, 0.7) !important;
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    
    /* 拟真双层外部投影与高光内阴影 */
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.06),
                0 2px 6px rgba(0, 0, 0, 0.02),
                inset 0 2px 4px rgba(255, 255, 255, 0.8) !important;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 999;
    
    /* 采用符合苹果人机交互的弹性缓动曲线（弹性放大，不旋转） */
    transition: transform 0.4s cubic-bezier(0.25, 1.5, 0.5, 1), 
                box-shadow 0.4s ease, 
                background 0.4s ease;
}

/* 🌟 点击/触摸时的弹性缩回反馈 */
.glass-trigger:active {
    transform: scale(0.92);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.04),
                inset 0 1px 2px rgba(255, 255, 255, 0.6) !important;
}

/* 🌟 悬浮状态下的高级微动：微微放大 + 阴影深邃 */
.glass-trigger:hover {
    transform: scale(1.08) translateY(-2px);
    background: linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(235, 242, 255, 0.65) 100%) !important;
    box-shadow: 0 12px 30px rgba(0, 71, 227, 0.1),
                0 4px 10px rgba(0, 0, 0, 0.04),
                inset 0 2px 4px rgba(255, 255, 255, 0.9) !important;
}

/* 按钮内部的图标颜色稍微调成更柔和优雅的深灰蓝，让它更耐看 */
.glass-trigger svg {
    width: 20px;
    height: 20px;
    fill: #3a3a3c;
    transition: fill 0.3s ease;
}

.glass-trigger:hover svg {
    fill: #0071e3; /* 悬浮时图标悄悄亮起经典的科技蓝 */
}
