/* =========================================
   1. [공통 기능] 뷰포트 전환 (PC/모바일)
   ========================================= */
function setViewMode(mode) {
    const viewport = document.querySelector('meta[name="viewport"]');
    if (mode === 'pc') viewport.setAttribute('content', 'width=1280');
    else viewport.setAttribute('content', 'width=device-width, initial-scale=1.0');
}


/* =========================================
   2. [지원절차 안내 페이지] 슬라이딩 토글
   ========================================= */
let currentActiveStep = null;

function toggleDetail(step, element) {
    const detailBox = document.getElementById('detail-box');
    const title = document.getElementById('detail-title');
    const content = document.getElementById('detail-content');
    const steps = document.querySelectorAll('.process-step');
    const sectionCard = element.closest('.section-card');

    if (detailBox.style.display === 'none') detailBox.style.display = '';

    // [체크] 이미 열려있는지 확인
    const wasActive = element.classList.contains('active');

    // [초기화] 모두 닫기
    steps.forEach(s => s.classList.remove('active'));
    detailBox.classList.remove('active'); 

    // [동작] 이미 열려있었다면 -> 여기서 끝 (접힘)
    if (wasActive) {
        currentActiveStep = null;
        return; 
    }

    // [동작] 닫혀있었다면 -> 내용 채우고 열기
    const details = {
        1: { title: "STEP 01 지원서 작성", content: `병무청 누리집의 <a href='https://mma.go.kr/contents.do?mc=mma0000743' class='process-detail-box-link' target='_blank'>이달의 모집계획</a>을 확인하고 지원서를 작성해요. <span class="highlight">응시지역 병무청을 경인(수원)</span>으로 선택하면 친절하고 빠른 상담이 가능해요. <br><br> <span class="process-detail-box-navi">⊙ <b>(모바일)</b> 병무청 어플 → 군지원서비스 → 지원서 작성<br>⊙ <b>(PC)</b> 병무청 누리집 → 군지원(입영신청)안내 → 지원서 작성/수정/취소 → 통합지원서 작성</span>` },
        2: { title: "STEP 02 1차 선발 및 서류제출", content: `자격/면허, 전공 점수, 가산점 등을 합산하여 1차 합격자를 선발해요. 합격 후 지정된 기한 내에 개별적으로 안내받은 <span class="highlight">구비서류를 병무청 누리집, 팩스 등의 방법으로 제출</span>해야 해요. <br> <span class="process-detail-box-navi"><br>⊙ <b>(모바일)</b> 병무청 어플 → 군지원서비스 → 나의지원정보 → 서류제출<br>⊙ <b>(PC)</b> 병무청 누리집 → 군지원(입영신청)안내 → 지원서 작성/수정/취소 → 서류제출</span>` },
        3: { title: "STEP 03 신체검사 등 전형 참석", content: `1차 합격자는 해당자에 한하여 지정된 일시에 신체검사에 참석해요.<br><br>26년 1회차 모집부터 <span class="highlight">면접이 전면 폐지</span>되었지만, 전문특기병(특임군사경찰, 의장병 등) <span class="highlight">일부 특기는 면접을 진행</span>해요. 범죄경력조회도 함께 진행되며, <a href='./모집병_범죄_선발_제외대상.png' class='process-detail-box-link' target='_blank'>특기별 제한사항</a>에 해당할 경우 선발이 제외될 수 있어요.` },
        4: { title: "STEP 04 최종 선발", content: `서류확인, 신체검사, 범죄경력조회 등의 절차를 거쳐 <span class="highlight">적격자 중 고득점자 순</span>으로 최종 선발자를 결정해요.<br><br>최종 합격하면 지원서 작성 시 기재한 개인 이메일, 나라사랑이메일, 병무청 어플로 입영(입영판정검사) 통지서가 발송돼요. 병무청 홈페이지에서도 통지서 확인이 가능해요. ` },
        5: { title: "STEP 05 입영", content: `최종 합격자는 <span class="highlight">입영 30일 전부터 1일 전까지 입영판정검사</span>를 받아요. 입영판정검사 결과 <span class="highlight">특기별 신체 제한사유에 해당하면 선발이 취소</span>될 수 있어요. 이때 육군 기술행정병 등은 일반 현역병으로, 해·공군·해병 전문특기병은 일반기술병으로 전환하여 입영이 가능해요.<br><br><a href='https://www.mma.go.kr/contents.do?mc=mma0000739' class='process-detail-box-link' target='_blank'>입영 시 유의사항과 준비물</a>을 확인하고, 입영통지서와 신분증, 나라사랑카드 등을 지참하여 지정된 입영일시, 부대로 입영해요.<br><br>질병, 가사정리 등의 사유로 입영일자 연기 또는 선발취소를 희망하는 경우 관련 서류(병원 진단서 등)를 구비하여 입영일 5일 전까지 민원을 신청할 수 있어요. 단순변심, 학업과 같은 사유로는 연기·취소가 어려워요.<br><br> <span class="process-detail-box-navi">⊙ <b>(모바일)</b> 병무청 어플 → 군지원서비스 → 나의지원정보 → 선발취소신청/입영일자연기신청<br>⊙ <b>(PC)</b> 병무청 누리집 → 병무민원 → 군지원 → 선발취소 신청/입영일자 연기 신청</span>` }
    };

    if (details[step]) {
        title.innerHTML = details[step].title;
        content.innerHTML = details[step].content;
        
        const isMobile = window.innerWidth <= 768;
        if (isMobile) {
            element.after(detailBox);
        } else {
            sectionCard.appendChild(detailBox);
        }

        requestAnimationFrame(() => {
            element.classList.add('active');
            detailBox.classList.add('active');
        });
        
        currentActiveStep = step;
    }
}


/* =========================================
   3. [모집병 제도 소개 페이지] 슬라이딩 토글
   ========================================= */

// 내용 데이터
const introData = {
    'army': {
        title: '<span style="color: #2A5034; font-family: GMarketSans_b, sans-serif;">육군 모집병</span>',
        content: `
            <p>육군은 <a href='https://mma.go.kr/contents.do?mc=mma0000386' class='process-detail-box-link'>기술행정병</a>, <a href='https://mma.go.kr/contents.do?mc=mma0000487' class='process-detail-box-link'>전문특기병</a>(<a href='https://mma.go.kr/contents.do?mc=mma0000522' class='process-detail-box-link'>어학병</a>, <a href='https://mma.go.kr/contents.do?mc=mma0000525' class='process-detail-box-link'>카투사</a> 포함), <a href='https://mma.go.kr/contents.do?mc=mma0000531' class='process-detail-box-link'>동반입대병</a>, <a href='https://mma.go.kr/contents.do?mc=mma0000533' class='process-detail-box-link'>직계가족복무병</a>, <a href='https://mma.go.kr/contents.do?mc=mma0000535' class='process-detail-box-link'>연고지복무병</a> 등으로 나누어 모집해요.<br>
            주로 지상을 활동영역으로 삼아 지상작전을 주임무로 하는데, 지역을 탈취하거나 확보하는 데 목적을 두고, 항공기의 지원을 받아 공수 또는 공중기동작전을 수행하기도 해요.</p>
            <ul class="intro-list">
                <li><span style="color: #555; font-family: GMarketSans_b, sans-serif;">기술행정병:</span> 수송운용, TOD병, 일반행정 등 140여 개 특기</li>
                <li><span style="color: #555; font-family: GMarketSans_b, sans-serif;">전문특기병:</span> 어학병, 특임군사경찰, 군악병 등 30여 개 특기 별도 선발</li>
                <li><span style="color: #555; font-family: GMarketSans_b, sans-serif;">동반입대병:</span> 친구나 가족과 함께 입영</li>
                <li><span style="color: #555; font-family: GMarketSans_b, sans-serif;">직계가족복무병:</span> (외)할아버지, 아빠, 형 등이 복무한 부대로 입영</li>
                <li><span style="color: #555; font-family: GMarketSans_b, sans-serif;">연고지복무병:</span> 주민등록을 하고 있는 연고지 인근 부대로 입영 </li>
            </ul>`
    },
    'navy': {
        title: '<span style="color: #001B69; font-family: GMarketSans_b, sans-serif;">해군 모집병</span>',
        content: `
            <p>해군은 <a href='https://mma.go.kr/contents.do?mc=mma0000537' class='process-detail-box-link'>일반기술병</a>, <a href='https://mma.go.kr/contents.do?mc=mma0000538' class='process-detail-box-link'>전문기술병</a>, <a href='https://mma.go.kr/contents.do?mc=mma0003452' class='process-detail-box-link'>전문특기병</a>, <a href='https://mma.go.kr/contents.do?mc=mma0000543' class='process-detail-box-link'>동반입대병</a>, <a href='https://mma.go.kr/contents.do?mc=mma0003360' class='process-detail-box-link'>복무지역선택병</a> 등으로 나누어 모집해요.<br>
            해상작전을 주임무로 하고, 전쟁억제, 해양통제, 해상교통로 보호, 군사력 투사, 국가 대외정책 지원 등의 임무를 주로 수행해요.</p>
            <ul class="intro-list">
                <li><span style="color: #555; font-family: GMarketSans_b, sans-serif;">일반기술병:</span> 조타, 무장, 전탐 등 20여 개 특기(해군교육사 특기분류)</li>
                <li><span style="color: #555; font-family: GMarketSans_b, sans-serif;">전문기술병:</span> 화생방, 의무, 조리 등 10개 분야</li>
                <li><span style="color: #555; font-family: GMarketSans_b, sans-serif;">전문특기병:</span> 군악병, 특전병(UDT), 어학병 등 18개 특기 별도 선발</li>
                <li><span style="color: #555; font-family: GMarketSans_b, sans-serif;">동반입대병:</span> 친구나 가족과 함께 입영</li>
                <li><span style="color: #555; font-family: GMarketSans_b, sans-serif;">복무지역선택병:</span> 1함대(동부), 2함대(서부) 중 희망 지역을 선택해 입영 </li>
            </ul>`
    },
    'airforce': {
        title: '<span style="color: #3399FF; font-family: GMarketSans_b, sans-serif;">공군 모집병</span>',
        content: `
            <p>공군은 <a href='https://www.mma.go.kr/contents.do?mc=mma0000465' class='process-detail-box-link'>일반기술병</a>, <a href='https://www.mma.go.kr/contents.do?mc=mma00004m 65' class='process-detail-box-link'>전문기술병</a>, <a href='https://www.mma.go.kr/contents.do?mc=mma0000465' class='process-detail-box-link'>전문특기병</a> 등으로 나누어 모집해요.<br>
            항공작전을 주임무로 하고, 이를 위해 필요한 교육과 훈련을 실시해요. 평시에는 영공방위 및 국지적 도발 제압의 임무를 수행하고 있어요.</p>
            <ul class="intro-list">
                <li><span style="color: #555; font-family: GMarketSans_b, sans-serif;">일반기술병:</span> 운항관제, 유류보급, 군사경찰 등 20여 개 특기(공군교육사 특기분류)</li>
                <li><span style="color: #555; font-family: GMarketSans_b, sans-serif;">전문기술병:</span> 전자계산, 화생방, 의무 등 7개 분야</li>
                <li><span style="color: #555; font-family: GMarketSans_b, sans-serif;">전문특기병:</span> 군악병, 군견관리병, 의장병 등 18개 특기 별도 선발</li>
            </ul>`
    },
    'marines': {
        title: '<span style="color: #CC101F; font-family: GMarketSans_b, sans-serif;">해병대 모집병</span>',
        content: `
            <p>해병대는 <a href='https://www.mma.go.kr/contents.do?mc=mma0000458' class='process-detail-box-link'>일반기술병</a>, <a href='https://www.mma.go.kr/contents.do?mc=mma0000458' class='process-detail-box-link'>전문기술병</a>, <a href='https://www.mma.go.kr/contents.do?mc=mma0003448' class='process-detail-box-link'>전문특기병</a>, <a href='https://www.mma.go.kr/contents.do?mc=mma0003113' class='process-detail-box-link'>동반입대병</a>, <a href='https://www.mma.go.kr/contents.do?mc=mma0003128' class='process-detail-box-link'>직계가족복무병</a> 등으로 나누어 모집해요.<br>
            "한번 해병은 영원한 해병!"이라는 말처럼 강인한 체력과 정신력을 바탕으로 상륙작전을 주로 수행해요.</p>
            <ul class="intro-list">
                <li><span style="color: #555; font-family: GMarketSans_b, sans-serif;">일반기술병:</span> 보병, 자주포조종, 군사경찰 등 30여 개 특기(해병대교훈단 특기분류)</li>
                <li><span style="color: #555; font-family: GMarketSans_b, sans-serif;">전문기술병:</span> 수색, 화학, 수송 등 5개 분야</li>
                <li><span style="color: #555; font-family: GMarketSans_b, sans-serif;">전문특기병:</span> 군악병, 의장병, 드론운용병 등 5개 특기 별도 선발</li>
                <li><span style="color: #555; font-family: GMarketSans_b, sans-serif;">동반입대병:</span> 친구나 가족과 함께 입영</li>
                <li><span style="color: #555; font-family: GMarketSans_b, sans-serif;">직계가족복무병:</span> (외)할아버지, 아빠, 형 등이 복무한 부대로 입영</li>
            </ul>`
    }
};

function toggleIntro(branch, element) {
            const detailBox = document.getElementById('intro-detail-box');
            const title = document.getElementById('intro-detail-title');
            const content = document.getElementById('intro-detail-content');
            const buttons = document.querySelectorAll('.intro-tab');
            const sectionCard = element.closest('.section-card');

            // display: none 제거
            if (detailBox.style.display === 'none') {
                detailBox.style.display = '';
            }

            const wasActive = element.classList.contains('active');

            // [초기화] 일단 닫기
            buttons.forEach(btn => btn.classList.remove('active'));
            detailBox.classList.remove('active');

            // 이미 열린 걸 눌렀다면 종료
            if (wasActive) {
                return;
            }

            // [핵심 수정: 풋터 튀어오름 방지]
            // 박스가 이미 제 자리에(sectionCard 안에) 있다면, 굳이 다시 appendChild를 하지 않음.
            // appendChild는 요소를 뺐다가 다시 넣는 과정이라 순간적으로 높이가 0이 되어 풋터가 튀어오름.
            const isMobile = window.innerWidth <= 768;
            
            // 데이터 채우기
            const data = introData[branch];
            if (data) {
                title.innerHTML = data.title;
                content.innerHTML = data.content;

                // 위치 이동 로직 (필요할 때만 이동)
                if (isMobile) {
                    // 모바일: 버튼 바로 아래로 이동
                    if (detailBox.previousElementSibling !== element) {
                         element.after(detailBox);
                    }
                } else {
                    // PC: 카드 맨 아래로 이동
                    // 만약 이미 부모가 sectionCard이고 맨 마지막 자식이라면 이동 금지
                    if (detailBox.parentNode !== sectionCard || sectionCard.lastElementChild !== detailBox) {
                        sectionCard.appendChild(detailBox);
                    }
                }

                // 애니메이션 실행
                requestAnimationFrame(() => {
                    element.classList.add('active');
                    detailBox.classList.add('active');
                });
            }
        }

/* PC/모바일 버전 전환 */
function setViewMode(mode) {
    const viewport = document.querySelector('meta[name="viewport"]');
    if (mode === 'pc') viewport.setAttribute('content', 'width=1280');
    else viewport.setAttribute('content', 'width=device-width, initial-scale=1.0');
}