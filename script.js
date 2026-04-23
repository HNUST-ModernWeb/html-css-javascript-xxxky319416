// DOM元素获取
const avatar = document.getElementById('avatar');
const avatarInput = document.getElementById('avatarInput');
const uploadBtn = document.getElementById('uploadBtn');
const nameInput = document.getElementById('nameInput');
const bioInput = document.getElementById('bioInput');
const nameDisplay = document.getElementById('nameDisplay');
const bioDisplay = document.getElementById('bioDisplay');
const saveBtn = document.getElementById('saveBtn');
const editBtn = document.getElementById('editBtn');

// 默认头像URL
const defaultAvatar = 'default-avatar.png';

// 初始化函数
function init() {
    // 从本地存储加载数据
    loadFromLocalStorage();
    
    // 绑定事件监听器
    bindEvents();
    
    // 初始状态设置
    toggleEditMode(false);
}

// 绑定事件监听器
function bindEvents() {
    // 头像上传按钮点击事件
    uploadBtn.addEventListener('click', () => {
        avatarInput.click();
    });
    
    // 头像文件选择事件
    avatarInput.addEventListener('change', handleAvatarUpload);
    
    // 保存按钮点击事件
    saveBtn.addEventListener('click', saveInfo);
    
    // 编辑按钮点击事件
    editBtn.addEventListener('click', () => {
        toggleEditMode(true);
    });
    
    // 输入框实时预览
    nameInput.addEventListener('input', updatePreview);
    bioInput.addEventListener('input', updatePreview);
}

// 处理头像上传
function handleAvatarUpload(event) {
    const file = event.target.files[0];
    if (file) {
        // 验证文件类型
        if (!file.type.startsWith('image/')) {
            alert('请选择图片文件！');
            return;
        }
        
        // 验证文件大小（限制为5MB）
        if (file.size > 5 * 1024 * 1024) {
            alert('图片大小不能超过5MB！');
            return;
        }
        
        const reader = new FileReader();
        reader.onload = function(e) {
            avatar.src = e.target.result;
            // 保存到本地存储
            localStorage.setItem('userAvatar', e.target.result);
            showNotification('头像更新成功！', 'success');
        };
        reader.readAsDataURL(file);
    }
}

// 保存个人信息
function saveInfo() {
    const name = nameInput.value.trim();
    const bio = bioInput.value.trim();
    
    // 验证输入
    if (!name) {
        showNotification('请输入姓名！', 'error');
        nameInput.focus();
        return;
    }
    
    if (!bio) {
        showNotification('请输入个人简介！', 'error');
        bioInput.focus();
        return;
    }
    
    // 更新显示区域
    nameDisplay.textContent = name;
    bioDisplay.textContent = bio;
    
    // 保存到本地存储
    localStorage.setItem('userName', name);
    localStorage.setItem('userBio', bio);
    
    // 切换到查看模式
    toggleEditMode(false);
    
    showNotification('信息保存成功！', 'success');
    
    // 添加保存动画效果
    animateSave();
}

// 更新实时预览
function updatePreview() {
    nameDisplay.textContent = nameInput.value || '未设置';
    bioDisplay.textContent = bioInput.value || '未设置';
}

// 切换编辑/查看模式
function toggleEditMode(isEdit) {
    if (isEdit) {
        // 编辑模式
        document.querySelector('.info-section').style.display = 'block';
        document.querySelector('.display-section').style.display = 'none';
        saveBtn.style.display = 'inline-block';
        editBtn.style.display = 'none';
        
        // 聚焦到姓名输入框
        setTimeout(() => nameInput.focus(), 100);
    } else {
        // 查看模式
        document.querySelector('.info-section').style.display = 'none';
        document.querySelector('.display-section').style.display = 'block';
        saveBtn.style.display = 'none';
        editBtn.style.display = 'inline-block';
    }
}

// 从本地存储加载数据
function loadFromLocalStorage() {
    const savedName = localStorage.getItem('userName');
    const savedBio = localStorage.getItem('userBio');
    const savedAvatar = localStorage.getItem('userAvatar');
    
    if (savedName) {
        nameInput.value = savedName;
        nameDisplay.textContent = savedName;
    }
    
    if (savedBio) {
        bioInput.value = savedBio;
        bioDisplay.textContent = savedBio;
    }
    
    if (savedAvatar) {
        avatar.src = savedAvatar;
    }
}

// 显示通知
function showNotification(message, type) {
    // 移除现有的通知
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // 创建新通知
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 20px;
        border-radius: 10px;
        color: white;
        font-weight: bold;
        z-index: 1000;
        animation: slideIn 0.3s ease;
        max-width: 300px;
    `;
    
    if (type === 'success') {
        notification.style.background = '#28a745';
    } else {
        notification.style.background = '#dc3545';
    }
    
    document.body.appendChild(notification);
    
    // 3秒后自动移除
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// 保存动画效果
function animateSave() {
    const card = document.querySelector('.card');
    card.style.animation = 'pulse 0.5s ease';
    setTimeout(() => {
        card.style.animation = '';
    }, 500);
}

// 添加CSS动画
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
    
    @keyframes pulse {
        0% {
            transform: scale(1);
        }
        50% {
            transform: scale(1.02);
        }
        100% {
            transform: scale(1);
        }
    }
    
    .notification {
        box-shadow: 0 5px 15px rgba(0,0,0,0.2);
    }
`;
document.head.appendChild(style);

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', init);
// ... existing code ...

// 显示通知
function showNotification(message, type) {
    // 移除现有的通知
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }

    // 创建新通知
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;

    document.body.appendChild(notification);

    // 3秒后自动移除
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// 保存动画效果
function animateSave() {
    const card = document.querySelector('.card');
    card.style.animation = 'pulse 0.5s ease';
    setTimeout(() => {
        card.style.animation = '';
    }, 500);
}

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', init);