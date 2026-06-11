/* --- PC/모바일 버전 전환 기능 --- */
function setViewMode(mode) {
    const viewport = document.querySelector('meta[name="viewport"]');
    if (!viewport) return;

    if (mode === 'pc') {
        viewport.setAttribute('content', 'width=1280');
    } else {
        viewport.setAttribute('content', 'width=device-width, initial-scale=1.0');
    }
}

/* --- 모바일 앱 가이드: 아코디언 기능 --- */
function toggleAppStep(element) {
    // PC 화면(768px 초과)에서는 클릭 이벤트 무시
    if (window.innerWidth > 768) return;

    const isActive = element.classList.contains('active');
    const allSteps = document.querySelectorAll('.app-step');

    allSteps.forEach(step => {
        step.classList.remove('active');
    });

    if (!isActive) {
        element.classList.add('active');
    }
}
