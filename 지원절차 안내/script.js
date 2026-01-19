/* --- 지원절차 안내: 슬라이딩 토글 기능 --- */
let currentActiveStep = null;

function toggleDetail(step, element) {
    const detailBox = document.getElementById('detail-box');
    const title = document.getElementById('detail-title');
    const content = document.getElementById('detail-content');
    const steps = document.querySelectorAll('.process-step');
    const sectionCard = element.closest('.section-card');

    // HTML에 남아있는 'display: none' 제거
    if (detailBox.style.display === 'none') {
        detailBox.style.display = '';
    }

    // 1. 클릭한 버튼이 이미 활성화 상태인지 확인
    const wasActive = element.classList.contains('active');

    // 2. [초기화] 일단 모든 걸 닫음 (닫히는 애니메이션 시작)
    steps.forEach(s => s.classList.remove('active'));
    detailBox.classList.remove('active'); 
    
    // 현재 활성화된 단계 초기화
    if (wasActive) {
        currentActiveStep = null;
        return; // 닫기만 하고 종료
    }

    // 3. [열기] 새로운 버튼을 클릭한 경우
    
    // 내용 데이터 정의
    const details = {
        1: { title: "STEP 01 지원서 작성", content: `병무청 누리집의 <a href='https://mma.go.kr/contents.do?mc=mma0000743' class='process-detail-box-link' target='_blank'>이달의 모집계획</a>을 확인하고 지원서를 작성해요. <span class="highlight">응시지역 병무청을 경인(수원)</span>으로 선택하면 친절하고 빠른 상담이 가능해요.<span class="process-detail-box-navi">⊙ <b>(모바일)</b> 병무청 어플 → 군지원서비스 → 지원서 작성<br>⊙ <b>(PC)</b> 병무청 누리집 → 군지원(입영신청)안내 → 지원서 작성/수정/취소 → 통합지원서 작성</span>` },
        2: { title: "STEP 02 1차 선발 및 서류제출", content: `자격/면허, 전공 점수, 가산점 등을 합산하여 1차 합격자를 선발해요. 합격 후 지정된 기한 내에 개별적으로 안내받은 <span class="highlight">구비서류를 병무청 누리집, 팩스 등의 방법으로 제출</span>해야 해요.<span class="process-detail-box-navi">⊙ <b>(모바일)</b> 병무청 어플 → 군지원서비스 → 나의지원정보 → 서류제출<br>⊙ <b>(PC)</b> 병무청 누리집 → 군지원(입영신청)안내 → 지원서 작성/수정/취소 → 서류제출</span>` },
        3: { title: "STEP 03 신체검사 등 전형 참석", content: `1차 합격자는 해당자에 한하여 지정된 일시에 신체검사에 참석해요.<br><br>26년 1회차 모집부터 <span class="highlight">면접이 전면 폐지</span>되었지만, 전문특기병(특임군사경찰, 의장병 등) <span class="highlight">일부 특기는 면접을 진행</span>해요. 범죄경력조회도 함께 진행되며, <a href='./모집병_범죄_선발_제외대상.png' class='process-detail-box-link' target='_blank'>특기별 제한사항</a>에 해당할 경우 선발이 제외될 수 있어요.` },
        4: { title: "STEP 04 최종 선발", content: `서류확인, 신체검사, 범죄경력조회 등의 절차를 거쳐 <span class="highlight">적격자 중 고득점자 순</span>으로 최종 선발자를 결정해요.<br><br>최종 합격하면 지원서 작성 시 기재한 개인 이메일, 나라사랑이메일, 병무청 어플로 입영(입영판정검사) 통지서가 발송돼요. 병무청 홈페이지에서도 통지서 확인이 가능해요. ` },
        5: { title: "STEP 05 입영", content: `최종 합격자는 <span class="highlight">입영 30일 전부터 1일 전까지 입영판정검사</span>를 받아요. 입영판정검사 결과 <span class="highlight">특기별 신체 제한사유에 해당하면 선발이 취소</span>될 수 있어요. 이때 육군 기술행정병 등은 일반 현역병으로, 해·공군·해병 전문특기병은 일반기술병으로 전환하여 입영이 가능해요.<br><br><a href='https://www.mma.go.kr/contents.do?mc=mma0000739' class='process-detail-box-link' target='_blank'>입영 시 유의사항과 준비물</a>을 확인하고, 입영통지서와 신분증, 나라사랑카드 등을 지참하여 지정된 입영일시, 부대로 입영해요.<br><br>질병, 가사정리 등의 사유로 입영일자 연기 또는 선발취소를 희망하는 경우 관련 서류(병원 진단서 등)를 구비하여 입영일 5일 전까지 민원을 신청할 수 있어요. 단순변심, 학업과 같은 사유로는 연기·취소가 어려워요.<span class="process-detail-box-navi">⊙ <b>(모바일)</b> 병무청 어플 → 군지원서비스 → 나의지원정보 → 선발취소신청/입영일자연기신청<br>⊙ <b>(PC)</b> 병무청 누리집 → 병무민원 → 군지원 → 선발취소 신청/입영일자 연기 신청</span>` }
};

if (details[step]) {
        // 내용 업데이트
        title.innerHTML = details[step].title;
        content.innerHTML = details[step].content;
        
        // [핵심 수정: 풋터 튀어오름 방지]
        // 박스가 이미 제 자리에 있다면 굳이 옮기지 않음 (DOM 조작 최소화)
        const isMobile = window.innerWidth <= 768;
        
        if (isMobile) {
            // 모바일: 버튼 바로 아래에 박스가 없으면 이동
            if (detailBox.previousElementSibling !== element) {
                element.after(detailBox);
            }
        } else {
            // PC: 섹션 카드 맨 아래에 박스가 없으면 이동
            // (부모가 sectionCard이고, 마지막 자식이 detailBox인지 확인)
            if (detailBox.parentNode !== sectionCard || sectionCard.lastElementChild !== detailBox) {
                sectionCard.appendChild(detailBox);
            }
        }

        // 브라우저가 준비된 후 애니메이션 시작
        requestAnimationFrame(() => {
            element.classList.add('active');
            detailBox.classList.add('active');
        });
        
        currentActiveStep = step;
    }
}

/* PC/모바일 버전 전환 */
function setViewMode(mode) {
    const viewport = document.querySelector('meta[name="viewport"]');
    if (mode === 'pc') viewport.setAttribute('content', 'width=1280');
    else viewport.setAttribute('content', 'width=device-width, initial-scale=1.0');
}