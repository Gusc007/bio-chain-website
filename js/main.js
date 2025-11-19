// Bio-Chain - 专业生物制品及药品物流运输
// 汉堡菜单优化：防止闪退和多次点击

document.addEventListener('DOMContentLoaded', function() {
    // 先初始化logo点击，确保它优先处理
    initLogoClick();
    initNavigation();
    initSmoothScrolling();
    initContactForm();
    initHeroVideo();
});

// Logo点击处理
function initLogoClick() {
    // 尝试多种选择器以确保找到logo链接
    const logoLink = document.querySelector('.logo-link') || 
                     document.querySelector('.logo a') || 
                     document.querySelector('.logo');
    
    if (logoLink) {
        console.log('Logo链接找到:', logoLink); // 调试信息
        
        // 确保logo链接可以接收点击事件
        logoLink.style.pointerEvents = 'auto';
        logoLink.style.cursor = 'pointer';
        
        // 使用捕获阶段确保事件被处理
        logoLink.addEventListener('click', function(e) {
            console.log('Logo被点击了'); // 调试信息
            
            // 检查是否是链接到其他页面
            const href = logoLink.getAttribute('href');
            if (href && (href.includes('index.html') || href === 'index.html')) {
                // 如果是链接到index.html，直接跳转，不阻止默认行为
                // 让浏览器正常处理链接跳转
                return true; // 允许默认行为
            } else if (href && href.startsWith('#')) {
                // 如果是当前页面的锚点链接，则进行平滑滚动
                e.preventDefault();
                e.stopPropagation();
                const targetSection = document.querySelector(href);
                if (targetSection) {
                    const offsetTop = targetSection.offsetTop - 80;
                    window.scrollTo({
                        top: Math.max(0, offsetTop),
                        behavior: 'smooth'
                    });
                } else {
                    window.scrollTo({
                        top: 0,
                        behavior: 'smooth'
                    });
                }
            }
            // 对于其他情况，允许默认行为
        }, true); // 使用捕获阶段
        
        // 也直接给logo容器添加点击事件作为备用
        const logoContainer = document.querySelector('.logo');
        if (logoContainer && logoContainer !== logoLink) {
            logoContainer.addEventListener('click', function(e) {
                // 如果点击的是logo容器而非链接本身，触发链接点击
                if (e.target !== logoLink && !logoLink.contains(e.target)) {
                    e.preventDefault();
                    e.stopPropagation();
                    logoLink.click();
                }
            }, true);
        }
        
        // 确保整个logo区域都可以点击
        const logoImg = document.querySelector('.logo-img');
        if (logoImg) {
            // 即使图片有pointer-events: none，父链接也应该能接收点击
            // 通过监听整个logo容器的点击来确保
            logoImg.addEventListener('click', function(e) {
                // 这个事件不应该被触发（因为pointer-events: none），但作为备用
                e.stopPropagation();
            }, true);
        }
    } else {
        console.error('找不到logo链接元素');
        // 如果找不到，尝试延迟查找
        setTimeout(() => {
            const delayedLink = document.querySelector('.logo-link') || 
                              document.querySelector('.logo a');
            if (delayedLink) {
                console.log('延迟找到logo链接，重新初始化');
                initLogoClick();
            }
        }, 500);
    }
}

// 导航栏功能
function initNavigation() {
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    let isAnimating = false;

    if (navToggle) {
        navToggle.addEventListener('click', function(e) {
            e.stopPropagation();
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

    // 点击菜单外部区域关闭菜单
    document.addEventListener('click', function(e) {
        if (window.innerWidth <= 768 && navMenu && navMenu.classList.contains('active')) {
            // 如果点击的不是菜单本身或菜单按钮，则关闭菜单
            if (!navMenu.contains(e.target) && !navToggle.contains(e.target) && !document.querySelector('.logo').contains(e.target)) {
                navMenu.classList.remove('active');
            }
        }
    });
}

// 平滑滚动功能
function initSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(link => {
        // 排除logo链接，因为它有专门的处理函数
        if (link.classList.contains('logo-link') || link.closest('.logo')) {
            return;
        }
        
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

// 首页视频背景初始化
function initHeroVideo() {
    const heroVideo = document.querySelector('.hero-video');
    if (heroVideo) {
        // 确保视频播放
        const playVideo = () => {
            heroVideo.play().catch(error => {
                console.log('视频自动播放被阻止:', error);
                // 如果自动播放失败，等待用户交互
                const playOnClick = () => {
                    heroVideo.play().then(() => {
                        document.removeEventListener('click', playOnClick);
                    }).catch(err => {
                        console.error('播放失败:', err);
                    });
                };
                document.addEventListener('click', playOnClick, { once: true });
            });
        };

        // 视频可以播放时
        heroVideo.addEventListener('canplay', function() {
            playVideo();
        });

        // 视频开始播放
        heroVideo.addEventListener('playing', function() {
            console.log('视频开始播放');
        });

        // 如果视频已经可以播放
        if (heroVideo.readyState >= 2) {
            playVideo();
        } else {
            // 强制重新加载视频
            heroVideo.load();
        }

        // 确保视频循环播放
        heroVideo.addEventListener('ended', function() {
            heroVideo.currentTime = 0;
            heroVideo.play();
        });

        // 页面可见性变化时恢复播放
        document.addEventListener('visibilitychange', function() {
            if (!document.hidden && heroVideo.paused && heroVideo.readyState >= 2) {
                heroVideo.play();
            }
        });

        // 视频播放错误处理
        heroVideo.addEventListener('error', function(e) {
            console.error('视频加载错误:', e);
            const error = heroVideo.error;
            if (error) {
                console.error('视频错误代码:', error.code);
                console.error('视频错误信息:', error.message);
            }
        });
    }
}

// 简单的动画效果
function checkAndShowElements() {
    const services = document.querySelectorAll('.service, .expertise-item, .feature');
    services.forEach(item => {
        const itemTop = item.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        if (itemTop < windowHeight * 0.8) {
            item.style.opacity = '1';
            item.style.transform = 'translateY(0)';
        }
    });
}

window.addEventListener('scroll', checkAndShowElements);

// 页面加载时的初始化
window.addEventListener('load', function() {
    // 初始化动画元素
    const animatedElements = document.querySelectorAll('.service, .expertise-item, .feature');
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
    
    // 立即检查一次，显示已在视口内的元素
    setTimeout(checkAndShowElements, 100);
    
    // 使用 Intersection Observer 作为备用方案，确保元素可见
    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '50px'
        });
        
        animatedElements.forEach(element => {
            observer.observe(element);
        });
    }
});
