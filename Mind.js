/**
 * TACTICAL HUD - Anti-gravity Career Mindmap
 * Core JavaScript Operations Engine
 */

// ==========================================
// 1. HIGH-TECH HOLOGRAM SVG ASSETS
// ==========================================
const ICON_ASSETS = {
  root_roadmap: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" fill="none" stroke="%23bd00ff" stroke-width="2"><circle cx="50" cy="50" r="30" stroke-dasharray="6 3"/><path d="M50 15 L50 5 M50 85 L50 95 M15 50 L5 50 M85 50 L95 50 M25 25 L18 18 M75 75 L82 82 M25 75 L18 82 M75 25 L82 18" stroke-width="4"/><path d="M50 32 L75 42 L50 52 L25 42 Z" fill="rgba(189,0,255,0.2)" stroke-width="2"/><path d="M35 48 L35 65 C35 70 65 70 65 65 L65 48 M75 42 L75 60 M75 60 C75 62 73 64 73 64" stroke-width="2"/></svg>',
  branch_major: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" fill="none" stroke="%2300ffff" stroke-width="2"><circle cx="50" cy="50" r="35" stroke-dasharray="5 5"/><circle cx="50" cy="50" r="15" fill="rgba(0,255,255,0.1)"/><line x1="50" y1="5" x2="50" y2="95"/><line x1="5" y1="50" x2="95" y2="50"/><path d="M40 40 L60 60 M40 60 L60 40"/></svg>',
  branch_school: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" fill="none" stroke="%23bd00ff" stroke-width="2"><polygon points="50,15 90,40 10,40" fill="rgba(189,0,255,0.1)"/><rect x="20" y="40" width="60" height="40"/><rect x="42" y="55" width="16" height="25" fill="rgba(189,0,255,0.2)"/><circle cx="50" cy="30" r="5"/></svg>',
  branch_capability: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" fill="none" stroke="%23bd00ff" stroke-width="2"><circle cx="50" cy="50" r="30" stroke-dasharray="4 2"/><path d="M50 15 L50 25 M50 75 L50 85 M15 50 L25 50 M75 50 L85 50 M32 32 L39 39 M68 68 L75 75 M32 75 L39 68 M68 32 L75 39" stroke-width="3"/><polygon points="40,43 60,43 50,65" fill="rgba(189,0,255,0.2)"/></svg>',
  branch_cert: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" fill="none" stroke="%23bd00ff" stroke-width="2"><path d="M50 15 L80 25 L80 55 C80 72 50 85 50 85 C50 85 20 72 20 55 L20 25 Z" fill="rgba(189,0,255,0.1)"/><circle cx="50" cy="45" r="12" stroke-dasharray="3 2"/><polygon points="50,38 53,44 60,45 55,50 56,57 50,53 44,57 45,50 40,45 47,44" fill="rgba(189,0,255,0.2)"/></svg>',
  branch_diff: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" fill="none" stroke="%23bd00ff" stroke-width="2"><circle cx="50" cy="50" r="35" stroke-dasharray="6 3"/><circle cx="50" cy="50" r="15" fill="rgba(189,0,255,0.1)"/><line x1="50" y1="15" x2="50" y2="35"/><line x1="50" y1="65" x2="50" y2="85"/><line x1="15" y1="50" x2="35" y2="50"/><line x1="65" y1="50" x2="85" y2="50"/></svg>',
  sub_mech: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" fill="none" stroke="%2300ffff" stroke-width="2"><rect x="25" y="55" width="50" height="20" rx="8" fill="rgba(0,255,255,0.1)"/><rect x="35" y="40" width="30" height="15" rx="4"/><line x1="65" y1="48" x2="90" y2="48" stroke-width="3"/><circle cx="33" cy="65" r="5"/><circle cx="50" cy="65" r="5"/><circle cx="67" cy="65" r="5"/><path d="M22 65 L78 65" stroke-dasharray="2 2"/></svg>',
  sub_aero: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" fill="none" stroke="%2300ffff" stroke-width="2"><path d="M50 15 C60 30 60 55 60 70 L40 70 C40 55 40 30 50 15 Z" fill="rgba(0,255,255,0.1)"/><path d="M40 70 L30 80 L35 85 L43 78 M60 70 L70 80 L65 85 L57 78"/><path d="M48 70 L40 90 L50 82 L60 90 L52 70" stroke="%23ff5f00"/><circle cx="50" cy="45" r="5" fill="rgba(0,255,255,0.2)"/></svg>',
  sub_mecha: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" fill="none" stroke="%2300ffff" stroke-width="2"><rect x="30" y="80" width="40" height="10" fill="rgba(0,255,255,0.1)"/><circle cx="50" cy="80" r="6"/><line x1="50" y1="80" x2="35" y2="50" stroke-width="3"/><circle cx="35" cy="50" r="5"/><line x1="35" y1="50" x2="60" y2="30" stroke-width="3"/><circle cx="60" cy="30" r="4"/><path d="M60 30 L70 20 M60 30 L65 15" stroke-width="2"/></svg>',
  sub_network: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" fill="none" stroke="%2300ffff" stroke-width="2"><circle cx="50" cy="50" r="40" stroke-dasharray="3 3"/><circle cx="50" cy="40" r="12" fill="rgba(0,255,255,0.1)"/><path d="M50 15 C35 15 35 45 50 65 C65 45 65 15 50 15 Z" fill="rgba(0,255,255,0.2)"/><circle cx="50" cy="33" r="5" fill="%2300ffff"/></svg>',
  sub_lab: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" fill="none" stroke="%2300ffff" stroke-width="2"><path d="M30 80 L70 80 M50 80 L50 70 M50 70 C40 70 35 60 35 45 C35 30 45 20 55 20 M55 20 L65 20 M60 20 L60 55" stroke-width="2.5"/><rect x="52" y="30" width="16" height="20" rx="2" transform="rotate(-25 60 40)" fill="rgba(0,255,255,0.1)"/><circle cx="45" cy="60" r="3"/></svg>',
  sub_cad: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" fill="none" stroke="%2300ffff" stroke-width="2"><rect x="15" y="20" width="70" height="45" rx="5" fill="rgba(0,255,255,0.05)"/><path d="M40 65 L30 80 L70 80 L60 65 Z" fill="rgba(0,255,255,0.1)"/><polygon points="50,28 65,37 65,53 50,62 35,53 35,37" stroke-dasharray="2 2"/><line x1="50" y1="28" x2="50" y2="62"/><line x1="35" y1="37" x2="65" y2="53"/><line x1="65" y1="37" x2="35" y2="53"/></svg>',
  sub_cert_req: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" fill="none" stroke="%2300ffff" stroke-width="2"><circle cx="50" cy="55" r="25" fill="rgba(0,255,255,0.1)"/><polygon points="35,15 45,40 55,40 65,15 M43,15 L50,35 L57,15" stroke="%23ff5f00" fill="rgba(255,95,0,0.1)"/><circle cx="50" cy="55" r="15" stroke-dasharray="3 3"/><polygon points="50,47 53,53 60,54 55,59 56,66 50,62 44,66 45,59 40,54 47,53" fill="rgba(0,255,255,0.2)"/></svg>',
  sub_cert_pref: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" fill="none" stroke="%2300ffff" stroke-width="2"><rect x="20" y="15" width="60" height="70" rx="4" fill="rgba(0,255,255,0.05)"/><line x1="30" y1="30" x2="70" y2="30"/><line x1="30" y1="42" x2="70" y2="42"/><line x1="30" y1="54" x2="55" y2="54"/><circle cx="65" cy="65" r="10" stroke="%23ff5f00" fill="rgba(255,95,0,0.1)"/><path d="M62 73 L60 85 L65 81 L70 85 L68 73" stroke="%23ff5f00"/></svg>',
  sub_proj: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" fill="none" stroke="%2300ffff" stroke-width="2"><line x1="25" y1="85" x2="75" y2="85" stroke-width="3"/><rect x="28" y="25" width="10" height="60" stroke-dasharray="2 2" fill="rgba(0,255,255,0.05)"/><rect x="62" y="25" width="10" height="60" stroke-dasharray="2 2" fill="rgba(0,255,255,0.05)"/><line x1="38" y1="35" x2="62" y2="35"/><line x1="38" y1="55" x2="62" y2="55"/><path d="M50 20 L58 45 L58 75 L42 75 L42 45 Z" fill="rgba(0,255,255,0.2)"/><line x1="50" y1="10" x2="50" y2="20" stroke="%23ff5f00" stroke-width="2"/></svg>',
  sub_contest: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" fill="none" stroke="%2300ffff" stroke-width="2"><path d="M35 20 L65 20 L60 55 C60 62 50 68 50 68 C50 68 40 62 40 55 Z" fill="rgba(0,255,255,0.1)"/><path d="M50 68 L50 80 M38 80 L62 80"/><path d="M35 25 C25 25 25 40 38 43 M65 25 C75 25 75 40 62 43"/><circle cx="50" cy="38" r="8" fill="rgba(0,255,255,0.2)"/></svg>',
  sub_security: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" fill="none" stroke="%2300ffff" stroke-width="2"><path d="M50 15 C65 15 78 20 78 20 C78 20 78 52 68 70 C58 83 50 87 50 87 C50 87 42 83 32 70 C22 52 22 20 22 20 C22 20 35 15 50 15 Z" fill="rgba(0,255,255,0.1)"/><rect x="42" y="47" width="16" height="14" rx="2" fill="rgba(0,255,255,0.2)"/><path d="M46 47 L46 41 C46 38 54 38 54 41 L54 47" stroke-width="1.8"/></svg>'
};

// ==========================================
// 2. TREE STRUCTURE DATA SETTINGS
// ==========================================
const MINDMAP_DATA = {
  name: "🎓 무기 제조 커리어 로드맵",
  type: "ROOT_NODE",
  img: "root_roadmap",
  desc: "국방 무기체계 설계 및 정밀 제조 공정을 담당하는 미래 핵심 방산 엔지니어로 성장하기 위한 전공, 역량, 자격, 프로젝트의 총체적 아키텍처 가이드라인.",
  mass: 3.0,
  children: [
    {
      name: "주요 추천 전공",
      type: "BRANCH_NODE",
      img: "branch_major",
      desc: "무기 체계의 기구학적 설계, 추진 시스템, 전자 융합 제어의 기초가 되는 방위산업 및 항공우주의 기저 공학 전공 분야.",
      mass: 2.0,
      children: [
        { 
          name: "기계·기계설계공학", 
          type: "SECTOR_SUB", 
          img: "sub_mech", 
          desc: "유도탄 탄체 설계, 지상 전투 기동 플랫폼의 강도 해석, 엔진 기구학 분석을 위한 3D 구조설계 및 유한요소해석(FEM) 역량.", 
          mass: 1.0 
        },
        { 
          name: "항공우주공학", 
          type: "SECTOR_SUB", 
          img: "sub_aero", 
          desc: "초음속 유도무기의 공기 역학적 특성 해석, 로켓 추진제 최적화 설계, 가스터빈 엔진 열역학 분석 및 비행제어 이론.", 
          mass: 1.0 
        },
        { 
          name: "메카트로닉스공학", 
          type: "SECTOR_SUB", 
          img: "sub_mecha", 
          desc: "무인 항공기(UAV) 및 다목적 로봇의 센서 융합 데이터 필터링, 모터 서보 제어, 임베디드 국방 H/W 신호 제어 설계.", 
          mass: 1.0 
        }
      ]
    },
    {
      name: "학교 및 연구실 선정",
      type: "BRANCH_NODE",
      img: "branch_school",
      desc: "정부 및 방위사업청 주도 국방 국책 과제를 수행하며 방산 대기업과의 산학 장학생 연계가 활발한 선도 연구 기관 네트워크.",
      mass: 2.0,
      children: [
        { 
          name: "거점 네트워크", 
          type: "SECTOR_SUB", 
          img: "sub_network", 
          desc: "주요 방산 클러스터(대전, 창원, 사천)에 인접한 거점 국립대 및 LIG넥스원/한화/KAI 산학 협력 교류 협의체 네트워크.", 
          mass: 1.0 
        },
        { 
          name: "방산 특화 랩 (Lab)", 
          type: "SECTOR_SUB", 
          img: "sub_lab", 
          desc: "국방과학연구소(ADD) 연계 미래 정밀 무기 연구실, 스마트 신관 개발실, 특수 복합재 적층 제조 국책 연구실.", 
          mass: 1.0 
        }
      ]
    },
    {
      name: "필수 핵심 역량",
      type: "BRANCH_NODE",
      img: "branch_capability",
      desc: "무기체계 R&D 및 정밀 생산 공정에 투입되기 위해 필수적으로 선결되어야 하는 고난이도의 엔지니어링 실무 기량.",
      mass: 2.0,
      children: [
        { 
          name: "3D CAD & 툴 활용", 
          type: "SECTOR_SUB", 
          img: "sub_cad", 
          desc: "CATIA(곡면 형상 설계) 및 SolidWorks를 활용한 3D 정밀 모델링, 구조/열/유체 물리 시뮬레이션을 통한 안정성 사전 검증.", 
          mass: 1.0 
        }
      ]
    },
    {
      name: "자격증",
      type: "BRANCH_NODE",
      img: "branch_cert",
      desc: "방위산업체 연구/설계직 서류 및 면접 전형에서 학술적 설계 능력과 정량적 기본 소양을 증명하는 전문 국가 기술 자격.",
      mass: 2.0,
      children: [
        { 
          name: "필수 자격", 
          type: "SECTOR_SUB", 
          img: "sub_cert_req", 
          desc: "일반기계기사, 기계설계기사 등 하중 계산, 2D 도면 해독, 공차 설계의 기초 역량을 공인 증명하는 핵심 자격 스펙.", 
          mass: 1.0 
        },
        { 
          name: "우대 자격", 
          type: "SECTOR_SUB", 
          img: "sub_cert_pref", 
          desc: "항공기사(유도무기 체계 가산점), 전산응용기계제도기능사(실무 CAD 숙련도 입증), 정보처리기사(제도 임베디드 융합).", 
          mass: 1.0 
        }
      ]
    },
    {
      name: "차별화 포인트",
      type: "BRANCH_NODE",
      img: "branch_diff",
      desc: "단순 스펙을 넘어 실전 연구 개발 경험과 투철한 직업 정신을 부각시키는 최종 면접 합격의 3대 차별화 속성.",
      mass: 2.0,
      children: [
        { 
          name: "프로젝트", 
          type: "SECTOR_SUB", 
          img: "sub_proj", 
          desc: "발사체 노즐 열해석 프로젝트, 초소형 정찰 드론 구동 프레임 설계 등 하드웨어 포트폴리오 및 캡스톤 디자인 실적.", 
          mass: 1.0 
        },
        { 
          name: "경진대회", 
          type: "SECTOR_SUB", 
          img: "sub_contest", 
          desc: "창작 비행체 경진대회, 모형 유도탄 사거리 시뮬레이션 경연, 학술 로봇 자율 주행 알고리즘 대회 입상 경력.", 
          mass: 1.0 
        },
        { 
          name: "보안 의식", 
          type: "SECTOR_SUB", 
          img: "sub_security", 
          desc: "방위산업 고유의 국가 보안(ADD 통제 규칙)에 대한 깊은 준법정신과 군사 기밀 유출 방지를 위한 투철한 애국적 책임감.", 
          mass: 1.0 
        }
      ]
    }
  ]
};

// ==========================================
// 3. MAIN SIMULATION CONFIG & STATES
// ==========================================
const container = document.getElementById('mindmap-container');
let width = container.clientWidth;
let height = container.clientHeight;

// Initialize D3 Root Hierarchy
const rootNode = d3.hierarchy(MINDMAP_DATA);

// Set unique ID for all nodes in the tree
let nodeId = 0;
rootNode.each(d => {
  d.id = `node_spec_${++nodeId}`;
  d.phase = Math.random() * Math.PI * 2;
  d.freqX = 0.4 + Math.random() * 0.4;
  d.freqY = 0.3 + Math.random() * 0.5;
  d.freqZ = 0.4 + Math.random() * 0.5;
  d.ampX = 5 + Math.random() * 4;
  d.ampY = 5 + Math.random() * 4;
  d.ampZ = 8 + Math.random() * 8;
  d.x = width / 2 + (Math.random() - 0.5) * 100;
  d.y = height / 2 + (Math.random() - 0.5) * 100;
});

rootNode.children.forEach(branch => {
  if (branch.children) {
    branch._children = branch.children;
    branch.children = null;
  }
});

rootNode.fx = width / 2;
rootNode.fy = height / 2;

const chargeForce = d3.forceManyBody().strength(-400);
const linkForce = d3.forceLink().distance(180).strength(0.5);
const centerForce = d3.forceCenter(width / 2, height / 2);
const collideForce = d3.forceCollide().radius(d => d.depth === 0 ? 125 : (d.depth === 1 ? 110 : 100));

const simulation = d3.forceSimulation()
  .force('charge', chargeForce)
  .force('link', linkForce)
  .force('center', centerForce)
  .force('collide', collideForce)
  .velocityDecay(0.4);

let selectedNode = rootNode;

// ==========================================
// 4. POINTER PARALLAX TILT & ZOOM TRANSFORMS
// ==========================================
let targetTiltX = 0;
let targetTiltY = 0;
let curTiltX = 0;
let curTiltY = 0;
let zoomTransform = { x: 0, y: 0, k: 1 }; // global zoom state

function handlePointerMove(clientX, clientY) {
  const normX = (clientX / window.innerWidth) - 0.5;
  const normY = (clientY / window.innerHeight) - 0.5;
  targetTiltX = -normY * 4; 
  targetTiltY = normX * 6;
  const coordEl = document.getElementById('mouse-coords');
  if (coordEl) {
    coordEl.innerText = `POINTER // X: ${Math.round(clientX)} Y: ${Math.round(clientY)}`;
  }
}

window.addEventListener('mousemove', (e) => {
  handlePointerMove(e.clientX, e.clientY);
});

window.addEventListener('touchmove', (e) => {
  if (e.touches && e.touches.length === 1) {
    handlePointerMove(e.touches[0].clientX, e.touches[0].clientY);
  }
}, { passive: true });

// ==========================================
// 5. DRAG BEHAVIOR FOR NODES (클릭/드래그 철저 분리)
// ==========================================
const DRAG_THRESHOLD = 10; 

const nodeDrag = d3.drag()
  .on('start', (event, d) => {
    // 마우스가 눌린 화면상의 절대 좌표 기록
    d._dragStartX = event.sourceEvent.clientX; 
    d._dragStartY = event.sourceEvent.clientY;
    d._wasDragged = false; // 드래그 상태 초기화
    
    if (!event.active) simulation.alphaTarget(0.2).restart();
    d.fx = d.x;
    d.fy = d.y;
  })
  .on('drag', (event, d) => {
    // 드래그 중인 화면 절대 좌표와의 거리 계산
    const dx = event.sourceEvent.clientX - d._dragStartX;
    const dy = event.sourceEvent.clientY - d._dragStartY;
    
    // 특정 픽셀 이상 움직였을 때만 "드래그"로 판정
    if (Math.sqrt(dx*dx + dy*dy) > DRAG_THRESHOLD) {
      d._wasDragged = true;
    }
    d.fx = event.x;
    d.fy = event.y;
  })
  .on('end', (event, d) => {
    if (!event.active) simulation.alphaTarget(0);
    if (d.depth !== 0) {
      d.fx = null;
      d.fy = null;
    }
  });

// ==========================================
// 6. RENDER & SIMULATION LIFECYCLE
// ==========================================

function updateSimulation() {
  const visibleNodes = rootNode.descendants();
  const visibleLinks = rootNode.links();
  
  linkForce.links(visibleLinks);
  simulation.nodes(visibleNodes);
  simulation.alpha(0.4).restart();
  
  syncDOM(visibleNodes, visibleLinks);
}

function syncDOM(nodes, links) {
  const nodeSelection = d3.select('#mindmap-container')
    .selectAll('.mindmap-node')
    .data(nodes, d => d.id);
    
  // 부모 div에는 드래그 기능만 바인딩합니다.
  const nodeEnter = nodeSelection.enter()
    .append('div')
    .attr('class', d => `mindmap-node node-level-${d.depth}`)
    .attr('id', d => d.id)
    .call(nodeDrag);
    
  // 시각적인 카드(사각형 모양) 자체에 직접 클릭 이벤트를 연결합니다.
  const nodeCard = nodeEnter.append('div')
    .attr('class', 'node-card')
    .on('click', (event, d) => {
      // 드래그 동작이었다면 클릭 실행을 취소하고 상태만 리셋합니다.
      if (d._wasDragged) { 
        d._wasDragged = false; 
        return; 
      }
      // 순수 클릭일 경우 즉시 메뉴 토글 및 하이라이트 실행
      event.stopPropagation();
      toggleNode(d);
      highlightNode(d);
    });
    
  const imgContainer = nodeCard.append('div')
    .attr('class', 'node-image-container');
    
  imgContainer.append('img')
    .attr('class', 'node-image')
    .attr('src', d => ICON_ASSETS[d.data.img] || ICON_ASSETS.branch_major)
    .attr('alt', d => d.data.name);
    
  nodeCard.append('div')
    .attr('class', 'node-title')
    .text(d => d.data.name);
    
  nodeEnter.each(function(d) {
    const cardEl = this.querySelector('.node-card');
    gsap.fromTo(cardEl, 
      { scale: 0, opacity: 0 },
      { 
        scale: 1, opacity: 1, duration: 0.85, 
        ease: "elastic.out(1.0, 0.45)", 
        delay: d.depth * 0.04 
      }
    );
  });
  
  nodeSelection.exit().each(function(d) {
    const cardEl = this.querySelector('.node-card');
    gsap.to(cardEl, {
      scale: 0, opacity: 0, duration: 0.35, ease: "power2.in",
      onComplete: () => { d3.select(this).remove(); }
    });
  });
  
  const linkSelection = d3.select('#links-group')
    .selectAll('.link-group')
    .data(links, d => `${d.source.id}-${d.target.id}`);
    
  const linkEnter = linkSelection.enter()
    .append('g')
    .attr('class', 'link-group');
    
  linkEnter.append('path')
    .attr('class', d => `connection-link ${d.source.depth === 0 ? 'parent-active' : ''}`);
    
  linkEnter.append('path')
    .attr('class', d => `connection-link-flow ${d.source.depth === 0 ? 'parent-active' : ''}`);
    
  linkSelection.exit().remove();
  
  const mergedLinks = linkSelection.merge(linkEnter);
  mergedLinks.each(function(d) {
    const paths = this.querySelectorAll('path');
    d.pathDom = paths[0];
    d.flowDom = paths[1];
  });
}

// ==========================================
// 7. EXPANSION & COLLAPSE PHYSICS
// ==========================================
function toggleNode(d) {
  if (d.children) {
    d._children = d.children;
    d.children = null;
  } else if (d._children) {
    d.children = d._children;
    d._children = null;
    d.children.forEach(child => {
      child.x = d.x; child.y = d.y; child.vx = 0; child.vy = 0;
    });
  }
  updateSimulation();
}

function highlightNode(d) {
  selectedNode = d;
  d3.selectAll('.node-card').classed('active', false);
  const targetNodeEl = document.getElementById(d.id);
  if (targetNodeEl) {
    d3.select(targetNodeEl).select('.node-card').classed('active', true);
  }
  const sidebar = document.getElementById('telemetry-sidebar');
  sidebar.classList.remove('collapsed');
  
  document.getElementById('node-type').innerText = d.data.type;
  document.getElementById('node-name').innerText = d.data.name;
  document.getElementById('node-description').innerText = d.data.desc;
  document.getElementById('tel-mass').innerText = `${d.data.mass.toFixed(1)} kg`;
  document.getElementById('tel-state').innerText = d.children ? "EXPANDED_ACTIVE" : (d._children ? "COLLAPSED_SLEEP" : "NOMINAL_NODE");
}

// ==========================================
// 8. 60FPS CONTINUOUS ANIMATION LOOP
// ==========================================
let frameCount = 0;
let lastFpsTime = performance.now();
const mindmapContainerEl = document.getElementById('mindmap-container');

function animate() {
  const time = performance.now() * 0.001;
  const gravityScale = parseFloat(document.getElementById('param-gravity').value);
  
  const visibleNodes = rootNode.descendants();
  visibleNodes.forEach(d => {
    const el = document.getElementById(d.id);
    if (!el) return;
    
    d.floatX = Math.sin(time * d.freqX + d.phase) * d.ampX * gravityScale;
    d.floatY = Math.cos(time * d.freqY + d.phase) * d.ampY * gravityScale;
    d.floatZ = Math.sin(time * d.freqZ + d.phase) * d.ampZ * gravityScale;
    
    const finalX = d.x + d.floatX;
    const finalY = d.y + d.floatY;
    const finalZ = d.floatZ;
    
    const nodeW = d.depth === 0 ? 220 : (d.depth === 1 ? 195 : 175);
    const nodeH = d.depth === 0 ? 155 : (d.depth === 1 ? 125 : 108);
    
    el.style.transform = `translate3d(${finalX - nodeW/2}px, ${finalY - nodeH/2}px, ${finalZ}px)`;
  });
  
  const visibleLinks = rootNode.links();
  visibleLinks.forEach(link => {
    const src = link.source;
    const tgt = link.target;
    if (!link.pathDom || !link.flowDom) return;
    
    const sX = src.x + (src.floatX || 0);
    const sY = src.y + (src.floatY || 0);
    const tX = tgt.x + (tgt.floatX || 0);
    const tY = tgt.y + (tgt.floatY || 0);
    
    const dx = tX - sX;
    const cx1 = sX + dx * 0.5;
    const cy1 = sY;
    const cx2 = sX + dx * 0.5;
    const cy2 = tY;
    
    const dStr = `M ${sX} ${sY} C ${cx1} ${cy1}, ${cx2} ${cy2}, ${tX} ${tY}`;
    link.pathDom.setAttribute('d', dStr);
    link.flowDom.setAttribute('d', dStr);
  });
  
  curTiltX += (targetTiltX - curTiltX) * 0.08;
  curTiltY += (targetTiltY - curTiltY) * 0.08;
  mindmapContainerEl.style.transform = `translate3d(${zoomTransform.x}px, ${zoomTransform.y}px, 0px) scale(${zoomTransform.k}) rotateX(${curTiltX}deg) rotateY(${curTiltY}deg)`;
  
  if (selectedNode) {
    const px = selectedNode.x + (selectedNode.floatX || 0);
    const py = selectedNode.y + (selectedNode.floatY || 0);
    const pz = selectedNode.floatZ || 0;
    document.getElementById('tel-x').innerText = `${px.toFixed(2)} px`;
    document.getElementById('tel-y').innerText = `${py.toFixed(2)} px`;
    document.getElementById('tel-z').innerText = `${pz.toFixed(2)} px`;
  }
  
  frameCount++;
  const now = performance.now();
  if (now - lastFpsTime >= 1000) {
    const fps = (frameCount * 1000) / (now - lastFpsTime);
    document.getElementById('simulator-fps').innerText = `FPS: ${fps.toFixed(2)}`;
    frameCount = 0;
    lastFpsTime = now;
  }
  
  requestAnimationFrame(animate);
}

// ==========================================
// 9. EVENT BINDING & INTERFACE SLIDERS
// ==========================================
function bindControlSliders() {
  document.getElementById('param-gravity').addEventListener('input', (e) => {
    document.getElementById('val-gravity').innerText = `${parseFloat(e.target.value).toFixed(1)}x`;
  });
  document.getElementById('param-charge').addEventListener('input', (e) => {
    const val = parseInt(e.target.value);
    document.getElementById('val-charge').innerText = val;
    chargeForce.strength(val);
    simulation.alpha(0.3).restart();
  });
  document.getElementById('param-distance').addEventListener('input', (e) => {
    const val = parseInt(e.target.value);
    document.getElementById('val-distance').innerText = val;
    linkForce.distance(val);
    simulation.alpha(0.3).restart();
  });
  document.getElementById('param-tension').addEventListener('input', (e) => {
    const val = parseFloat(e.target.value);
    document.getElementById('val-tension').innerText = val.toFixed(2);
    linkForce.strength(val);
    simulation.alpha(0.3).restart();
  });
  document.getElementById('param-damping').addEventListener('input', (e) => {
    const val = parseFloat(e.target.value);
    document.getElementById('val-damping').innerText = val.toFixed(2);
    simulation.velocityDecay(val);
    simulation.alpha(0.3).restart();
  });
  document.getElementById('btn-reset-physics').addEventListener('click', () => {
    document.getElementById('param-gravity').value = 1.5;
    document.getElementById('param-charge').value = -300;
    document.getElementById('param-distance').value = 150;
    document.getElementById('param-tension').value = 0.5;
    document.getElementById('param-damping').value = 0.4;
    document.getElementById('val-gravity').innerText = "1.5x";
    document.getElementById('val-charge').innerText = "-300";
    document.getElementById('val-distance').innerText = "150";
    document.getElementById('val-tension').innerText = "0.50";
    document.getElementById('val-damping').innerText = "0.40";
    chargeForce.strength(-300);
    linkForce.distance(150).strength(0.5);
    simulation.velocityDecay(0.4);
    simulation.alpha(0.5).restart();
  });
  document.getElementById('btn-expand-all').addEventListener('click', () => {
    rootNode.each(d => {
      if (d._children) {
        d.children = d._children;
        d._children = null;
      }
    });
    updateSimulation();
  });
  document.getElementById('sidebar-close').addEventListener('click', () => {
    document.getElementById('telemetry-sidebar').classList.add('collapsed');
    d3.selectAll('.node-card').classed('active', false);
    selectedNode = null;
  });

  const toggleControlsBtn = document.getElementById('btn-toggle-controls');
  if (toggleControlsBtn) {
    toggleControlsBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      const panel = document.querySelector('.hud-control-panel');
      if (panel) {
        panel.classList.toggle('active');
        toggleControlsBtn.classList.toggle('active-btn');
      }
    });
  }
}

function setupZoom() {
  const zoomBehavior = d3.zoom()
    .scaleExtent([0.3, 3.0])
    .on('zoom', (event) => {
      zoomTransform = event.transform;
    });
    
  d3.select('#viewport-3d')
    .call(zoomBehavior)
    .on('dblclick.zoom', null);
}

window.addEventListener('resize', () => {
  width = container.clientWidth;
  height = container.clientHeight;
  centerForce.x(width / 2).y(height / 2);
  rootNode.fx = width / 2;
  rootNode.fy = height / 2;
  simulation.alpha(0.3).restart();
});

function updateSystemClock() {
  const clockEl = document.getElementById('system-time');
  setInterval(() => {
    const d = new Date();
    const hrs = String(d.getHours()).padStart(2, '0');
    const mins = String(d.getMinutes()).padStart(2, '0');
    const secs = String(d.getSeconds()).padStart(2, '0');
    clockEl.innerText = `SYS_TIME: ${hrs}:${mins}:${secs}`;
  }, 1000);
}

// ==========================================
// 10. INITIALIZATION
// ==========================================
function init() {
  setupZoom();
  bindControlSliders();
  updateSystemClock();
  highlightNode(rootNode);
  updateSimulation();
  requestAnimationFrame(animate);
}

window.addEventListener('DOMContentLoaded', init);