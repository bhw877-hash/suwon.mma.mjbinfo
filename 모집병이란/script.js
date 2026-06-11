/* =========================================
   [공통 기능] PC/모바일 버전 전환
   ========================================= */
function setViewMode(mode) {
    const viewport = document.querySelector('meta[name="viewport"]');
    if (!viewport) return;
    if (mode === 'pc') viewport.setAttribute('content', 'width=1280');
    else viewport.setAttribute('content', 'width=device-width, initial-scale=1.0');
}

/* =========================================
   [모집병이란] 군별 안내 펼치기/접기
   - 모바일: 누른 버튼 바로 아래 고정 패널을 열어 풋터 튐 방지
   - PC: 기존처럼 버튼 묶음 아래 공통 패널을 열기
   ========================================= */
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

function closeIntroPanels() {
    document.querySelectorAll('.process-detail-box').forEach(box => {
        box.classList.remove('active');
        box.style.maxHeight = '';
    });
}

function openIntroPanel(box, data) {
    if (!box) return;
    const title = box.querySelector('h4');
    const content = box.querySelector('#intro-detail-content, .intro-detail-content');
    if (!title || !content) return;

    title.innerHTML = data.title;
    content.innerHTML = data.content;

    // 높이 값을 고정하지 않아 모바일 폭·웹폰트 로딩에 따라 내용이 늘어나도 하단이 잘리지 않습니다.
    box.style.maxHeight = '';
    box.classList.add('active');
}

function toggleIntro(branch, element) {
    const data = introData[branch];
    if (!data) return;

    const wasActive = element.classList.contains('active');
    document.querySelectorAll('.intro-tab').forEach(btn => btn.classList.remove('active'));
    closeIntroPanels();

    if (wasActive) return;

    const isMobile = window.matchMedia('(max-width: 768px)').matches;
    const targetBox = isMobile
        ? document.getElementById('intro-detail-' + branch)
        : document.getElementById('intro-detail-box');

    element.classList.add('active');
    openIntroPanel(targetBox, data);
}

window.addEventListener('resize', () => {
    const activeButton = document.querySelector('.intro-tab.active');
    if (!activeButton) return;

    const branch = activeButton.getAttribute('data-type');
    closeIntroPanels();
    const targetBox = window.matchMedia('(max-width: 768px)').matches
        ? document.getElementById('intro-detail-' + branch)
        : document.getElementById('intro-detail-box');

    if (introData[branch] && targetBox) openIntroPanel(targetBox, introData[branch]);
});
