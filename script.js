/* --- PC/모바일 버전 전환 기능 --- */
function setViewMode(mode) {
    // 뷰포트 메타 태그 찾기
    const viewport = document.querySelector('meta[name="viewport"]');
    
    if (!viewport) return; // 태그가 없으면 실행 중단

    if (mode === 'pc') {
        // PC 버전: 강제로 너비를 1280px로 고정 (화면 축소 효과)
        viewport.setAttribute('content', 'width=1280');
    } else {
        // 모바일 버전: 기기 너비에 맞춤 (반응형 복구)
        viewport.setAttribute('content', 'width=device-width, initial-scale=1.0');
    }
}

/* --- PC/모바일 버전 전환 기능 --- */
function setViewMode(mode) {
    // 뷰포트 태그 찾기
    const viewport = document.querySelector('meta[name="viewport"]');
    
    if (mode === 'pc') {
        // PC 버전: 강제로 너비를 1280px로 고정하여 넓게 보여줌
        viewport.setAttribute('content', 'width=1280');
    } else {
        // 모바일 버전: 다시 기기 너비에 맞춰 자동 조절 (반응형 복구)
        viewport.setAttribute('content', 'width=device-width, initial-scale=1.0');
    }
}

/* --- 모바일 앱 가이드: 아코디언 기능 --- */
function toggleAppStep(element) {
    // PC 화면(768px 초과)에서는 클릭 이벤트 무시
    if (window.innerWidth > 768) return;

    // 1. 이미 열려있는지 확인
    const isActive = element.classList.contains('active');

    // 2. 모든 단계 닫기 (하나만 열리게 하려면 이 부분 유지, 다 열리게 하려면 삭제)
    const allSteps = document.querySelectorAll('.app-step');
    allSteps.forEach(step => {
        step.classList.remove('active');
    });

    // 3. 클릭한 단계가 닫혀있었다면 열기
    if (!isActive) {
        element.classList.add('active');
    }
}