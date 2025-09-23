// Bio-Chain - 专业生物制品及药品物流运输
// 汉堡菜单优化：防止闪退和多次点击

document.addEventListener('DOMContentLoaded', function() {
    initNavigation();
    initSmoothScrolling();
    initContactForm();
});

// 导航栏功能
function initNavigation() {
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    let isAnimating = false;

    if (navToggle) {
        navToggle.addEventListener('click', function() {
            if (isAnimating) return;
            isAnimating = true;
            navMenu.classList.toggle('active');
            setTimeout(() => { isAnimating = false; }, 350);
        });
    }

    // 点击导航链接时关闭移动端菜单
    const navLinks = document.querySelectorAll('.nav-menu a');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            if (window.innerWidth <= 768 && navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                const href = link.getAttribute('href');
                if (href && href.startsWith('#')) {
                    e.preventDefault();
                    setTimeout(() => {
                        window.location.hash = href;
                    }, 350);
                }
            }
        });
    });
}

// 平滑滚动功能
function initSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            // 只处理锚点跳转
            const targetId = this.getAttribute('href');
            if (!targetId.startsWith('#')) return;
            e.preventDefault();
            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// 联系表单处理
function initContactForm() {
    // 尝试多种选择器
    const contactForm = document.querySelector('#contactForm') || 
                       document.querySelector('.contact-form') ||
                       document.querySelector('form');
    
    console.log('联系表单元素:', contactForm); // 调试信息
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            console.log('表单提交事件触发'); // 调试信息
            
            // 使用name属性获取表单数据，更可靠
            const formData = new FormData(this);
            const name = formData.get('name') || this.querySelector('input[name="name"]')?.value || '';
            const email = formData.get('email') || this.querySelector('input[name="email"]')?.value || '';
            const phone = formData.get('phone') || this.querySelector('input[name="phone"]')?.value || '';
            const service = formData.get('service') || this.querySelector('select[name="service"]')?.value || '';
            const message = formData.get('message') || this.querySelector('textarea[name="message"]')?.value || '';
            
            console.log('表单数据:', { name, email, phone, service, message }); // 调试信息
            
            // 简单的表单验证
            if (!name.trim() || !email.trim() || !phone.trim() || !service || !message.trim()) {
                alert('请填写所有字段');
                return;
            }
            
            if (!isValidEmail(email.trim())) {
                alert('请输入有效的邮箱地址');
                return;
            }
            
            if (!isValidPhone(phone.trim())) {
                alert('请输入有效的电话号码（至少7位数字）');
                return;
            }
            
            // 模拟表单提交
            const submitButton = this.querySelector('button[type="submit"]');
            if (!submitButton) {
                console.error('找不到提交按钮');
                return;
            }
            
            const originalText = submitButton.textContent;
            submitButton.textContent = '发送中...';
            submitButton.disabled = true;
            
            // 发送到后端API
            fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: name.trim(),
                    email: email.trim(),
                    phone: phone.trim(),
                    service: service,
                    message: message.trim()
                })
            })
            .then(response => {
                console.log('API响应状态:', response.status);
                if (!response.ok) {
                    throw new Error(`HTTP ${response.status}: ${response.statusText}`);
                }
                return response.json();
            })
            .then(data => {
                console.log('API响应数据:', data);
                if (data.success) {
                    alert(data.message);
                    this.reset();
                } else {
                    alert('发送失败: ' + data.message);
                }
            })
            .catch(error => {
                console.error('发送错误:', error);
                // 如果API不可用，回退到模拟发送
                console.log('API不可用，使用模拟发送');
                setTimeout(() => {
                    alert('消息发送成功！我们会尽快回复您。\n\n注意：当前为模拟发送，实际邮件发送需要配置邮件服务。');
                    this.reset();
                    submitButton.textContent = originalText;
                    submitButton.disabled = false;
                }, 2000);
            })
            .finally(() => {
                // 只有在API成功的情况下才重置按钮状态
                // 如果API失败，在catch中处理
            });
        });
    } else {
        console.error('找不到联系表单元素');
        // 尝试延迟查找
        setTimeout(() => {
            const delayedForm = document.querySelector('#contactForm') || 
                               document.querySelector('.contact-form');
            if (delayedForm) {
                console.log('延迟找到表单，重新初始化');
                initContactForm();
            }
        }, 1000);
    }
}

// 邮箱验证函数
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// 电话验证函数
function isValidPhone(phone) {
    // 移除所有非数字字符，只保留数字
    const cleanPhone = phone.replace(/\D/g, '');
    // 至少7位数字，最多15位数字
    return cleanPhone.length >= 7 && cleanPhone.length <= 15;
}

// 简单的动画效果
window.addEventListener('scroll', function() {
    const services = document.querySelectorAll('.service, .expertise-item, .feature');
    services.forEach(item => {
        const itemTop = item.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        if (itemTop < windowHeight * 0.8) {
            item.style.opacity = '1';
            item.style.transform = 'translateY(0)';
        }
    });
});

// 页面加载时的初始化
window.addEventListener('load', function() {
    // 初始化动画元素
    const animatedElements = document.querySelectorAll('.service, .expertise-item, .feature');
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
});
