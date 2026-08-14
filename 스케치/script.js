const 장면 = new 삼차원.장면()
장면.배경 = new 삼차원.색('#000000')

const 카메라 = new 삼차원.원근카메라(35, 창.너비 / 창.높이, 0.1, 1000)

function 카메라거리맞추기() {
  const 카메라거리 = window.matchMedia('(max-width: 600px)').matches ? 13.2 : 10.5
  카메라.위치.설정(카메라거리,0,카메라거리)
  카메라.바라보기(0,0,0)
}

카메라거리맞추기()

const 렌더러 = new 삼차원.렌더러({ 안티앨리어싱: true })
렌더러.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2))
렌더러.outputColorSpace = THREE.SRGBColorSpace
렌더러.toneMapping = THREE.NoToneMapping
렌더러.크기설정(창.너비, 창.높이)
문서.본문.붙이기(렌더러.돔요소)


const 주변빛 = new 삼차원.주변빛('흰색', 2.2)
장면.추가(주변빛)

const 방향빛 = new 삼차원.방향빛('흰색', 0.7)
방향빛.위치.설정(6,6,6)
장면.추가(방향빛)

const 로더 = new 삼차원.텍스처로더()
const 최대이방성 = Math.min(16, 렌더러.capabilities.getMaxAnisotropy())
const 종이 = new THREE.MeshBasicMaterial({ color: 0xe5e4df, toneMapped: false })
const 그룹 = 장면.그룹만들기()

function 텍스처선명하게(텍스처) {
  텍스처.색공간 = 삼차원.SRGB색공간
  텍스처.anisotropy = 최대이방성
  텍스처.magFilter = THREE.LinearFilter
  텍스처.minFilter = THREE.LinearMipmapLinearFilter
  텍스처.generateMipmaps = true
  return 텍스처
}

function 이미지재질(텍스처) {
  return new THREE.MeshBasicMaterial({ map: 텍스처, toneMapped: false })
}

const 정보창 = document.querySelector('#book-panel')
const 정보번호 = document.querySelector('#book-number')
const 정보제목 = document.querySelector('#book-title')
const 정보저자 = document.querySelector('#book-author')
const 정보쪽수 = document.querySelector('#book-pages')
const 정보크기 = document.querySelector('#book-size')
const 정보연도 = document.querySelector('#book-year')
const 정보제본 = document.querySelector('#book-format')

let 선택책 = null
let 회전속도 = 0.001
const 기본회전속도 = 0.001
let 터치시작X = 0
let 터치이전X = 0
let 터치이동거리 = 0
let 마지막터치선택시간 = 0

const 책수 = 9
const 반지름 = 5
const 기본책높이 = 2.9
const 기본책두께 = 0.3
const 책정보 = [
  { 제목: '빈칸의 도서관', 저자: '조현지', 쪽수: '144p', 크기: '150 × 211 mm', 연도: '2024', 제본: 'Hardcover' },
  { 제목: 'CUBIC', 저자: '우연식', 쪽수: '162p', 크기: '165 × 240 mm', 연도: '2019', 제본: 'Hardcover' },
  { 제목: '디자인 어질리티 + 큐큐', 저자: '사록', 쪽수: '470p', 크기: '105 × 170 mm', 연도: '2020', 제본: 'Paperback' },
  { 제목: '책은 전진한다 - 책, 시간, 공간', 저자: '신신', 쪽수: '202p', 크기: '150 × 211 mm', 연도: '2025', 제본: 'Paperback' },
  { 제목: '해변의 거리', 저자: '사사키 마키', 쪽수: '420p', 크기: '152 × 212 mm', 연도: '2013', 제본: 'Hardcover' },
  { 제목: '만화책 형태에 관한 만화책', 저자: '이율리', 쪽수: '240p', 크기: '125 × 187 mm', 연도: '2024', 제본: 'Exposed Spine' },
  { 제목: '혓바늘', 저자: '못니', 쪽수: '260p', 크기: '100 × 170 mm', 연도: '2023', 제본: 'Exposed Spine' },
  { 제목: '만화의 이해', 저자: '스콧 맥클라우드', 쪽수: '256p', 크기: '180 × 260 mm', 연도: '2008', 제본: 'Paperback' },
  { 제목: '뭐가 먼저냐', 저자: '정대봉', 쪽수: '128p', 크기: '181 × 221 mm', 연도: '2022', 제본: 'Paperback' }
]
  

for (let i=0; i < 책수; i++) {
  const 번호 = i + 1
  const 이미지버전 = 번호 === 5 ? 4 : 2
  let 책

  function 책등비율적용(텍스처) {
    const 이미지 = 텍스처.image
    const 이미지너비 = 이미지?.naturalWidth || 이미지?.width
    const 이미지높이 = 이미지?.naturalHeight || 이미지?.height
    if (!책 || !이미지너비 || !이미지높이) return

    const 실제책두께 = 기본책높이 * (이미지너비 / 이미지높이)
    책.scale.z = 실제책두께 / 기본책두께
  }

  const 표지 = 로더.불러오기 ('Cover_' + 번호 + '.jpg?v=' + 이미지버전)
  const 책등 = 로더.불러오기 ('Spine_' + 번호 + '.jpg?v=' + 이미지버전, (완료된책등) => {
    텍스처선명하게(완료된책등)
    책등비율적용(완료된책등)
  })
  const 뒷면 = 로더.불러오기 ('back_' + 번호 + '.jpg?v=' + 이미지버전)
  텍스처선명하게(표지)
  텍스처선명하게(책등)
  텍스처선명하게(뒷면)

  책 = new 삼차원.도형(
    new 삼차원.상자모양(2.1, 기본책높이, 기본책두께),
    [
    종이,
    이미지재질(책등),
    종이,
    종이,
    이미지재질(표지),
    이미지재질(뒷면),
    ]
  )

  // 위에서 내려다봤을 때 책 번호가 시계 방향(1 → 2 → 3)으로 이어집니다.
  const 각책의각도 = -(i / 책수) * 수학.파이 * 2
  const x = 수학.코사인(각책의각도) * 반지름
  const z = 수학.사인(각책의각도) * 반지름

  책.제목 = 책정보[i].제목
  책.저자 = 책정보[i].저자
  책.쪽수 = 책정보[i].쪽수
  책.판형 = 책정보[i].크기
  책.연도 = 책정보[i].연도
  책.제본 = 책정보[i].제본
  책.번호 = 번호
  책.각도 = 각책의각도

  책.위치.설정(x,0,z)
  책.바라보기(x * 2, 0, z * 2)
  그룹.추가(책)
  책등비율적용(책등)
}


렌더러.애니메이션시작(() => {
  if(선택책 === null){}
  // 휠·터치 입력 뒤에는 관성으로 움직이고 서서히 기본 회전으로 돌아옵니다.
  회전속도 += (기본회전속도 - 회전속도) * 0.015
  그룹.회전.y += 회전속도
  렌더러.렌더링(장면,카메라)
  
})

const 광선 = new 삼차원.광선()

// 데스크톱: 휠 방향에 따라 회전 방향과 속도를 바꿉니다.
렌더러.돔요소.addEventListener('wheel', (e) => {
  e.preventDefault()
  const 휠이동 = Math.abs(e.deltaY) >= Math.abs(e.deltaX) ? e.deltaY : e.deltaX
  회전속도 += 휠이동 * 0.000025
  회전속도 = Math.max(-0.035, Math.min(0.035, 회전속도))
}, { passive: false })

// 모바일: 손가락을 움직이는 좌우 방향 그대로 책을 회전시킵니다.
렌더러.돔요소.addEventListener('touchstart', (e) => {
  터치시작X = e.touches[0].clientX
  터치이전X = 터치시작X
  터치이동거리 = 0
}, { passive: true })

렌더러.돔요소.addEventListener('touchmove', (e) => {
  e.preventDefault()
  const 현재X = e.touches[0].clientX
  const 이동X = 현재X - 터치이전X
  터치이동거리 += Math.abs(이동X)
  그룹.회전.y += 이동X * 0.006
  회전속도 = Math.max(-0.035, Math.min(0.035, 이동X * 0.0015))
  터치이전X = 현재X
}, { passive: false })

function 책선택하기(입력) {
  광선.겨누기(입력, 카메라)

  const 포인트 = 광선.닿은것찾기(그룹.자식들)
  if (포인트[0]) {
    선택책 = 포인트[0].물체
    그룹.부드럽게돌기(선택책.각도 - 수학.파이 / 4)
    정보번호.textContent = 'Book ' + String(선택책.번호).padStart(2, '0')
    정보제목.textContent = 선택책.제목
    정보저자.textContent = 선택책.저자
    정보쪽수.textContent = 선택책.쪽수
    정보크기.textContent = 선택책.판형
    정보연도.textContent = 선택책.연도
    정보제본.textContent = 선택책.제본
    정보창.classList.toggle('has-expanded-details', 선택책.번호 !== 6 && 선택책.번호 !== 7)
    정보창.classList.add('is-visible')
    정보창.setAttribute('aria-hidden', 'false')
  }
  else{
    선택책 = null
    정보창.classList.remove('is-visible')
    정보창.setAttribute('aria-hidden', 'true')
  }
}

렌더러.돔요소.addEventListener('touchend', (e) => {
  // 짧은 탭은 모바일에서 즉시 선택하고, 드래그는 선택으로 처리하지 않습니다.
  if (터치이동거리 <= 8 && e.changedTouches[0]) {
    const 터치 = e.changedTouches[0]
    책선택하기({ clientX: 터치.clientX, clientY: 터치.clientY })
    마지막터치선택시간 = Date.now()
  }
  터치이동거리 = 0
}, { passive: true })

창.이벤트걸기('클릭', (e) => {
  // touchend 뒤 발생하는 중복 click은 무시합니다.
  if (Date.now() - 마지막터치선택시간 < 500) return
  책선택하기(e)
})

창.이벤트걸기('크기변경', () => {
  카메라거리맞추기()
  카메라.화면비율= 창.너비 / 창.높이
  카메라.투영갱신()
  렌더러.크기설정(창.너비, 창.높이)
})
