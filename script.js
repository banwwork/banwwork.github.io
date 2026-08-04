const projects = [
  { title: "Melting Down", category: "Printing", year: "2025", client: "Personal Project", color: "c-blue", image: "./images/MTD_book_1.jpg", description: "핑크와 블루 두 가지 색을 중심으로 제작한 리소그래프 북입니다. 녹아내리는 여름의 감각을 인물과 작은 오브젝트의 이야기로 구성했습니다." },
  { title: "Melting Down Objects", category: "Goods", year: "2025", client: "Personal Project", color: "c-pink", image: "./images/MTD_MD_1.jpg", description: "Melting Down의 그래픽을 일상에서 사용할 수 있는 키링과 작은 오브젝트로 확장한 프로젝트입니다." },
  { title: "Melting Down Calendar", category: "Goods", year: "2025", client: "Personal Project", color: "c-sky", image: "./images/MTD_MD_2.jpg", description: "프로젝트의 리소그래프 이미지를 작은 캘린더 형태로 재구성해 휴대 가능한 오브젝트로 제작했습니다." },
  { title: "Fledgling Season", category: "Poster", year: "2026", client: "Poster Project", color: "c-blue", image: "./images/Poster Project 2_idea.jpg", description: "학이 둥지를 떠나 처음 비행하는 시기를 강렬한 블루와 세밀한 드로잉으로 표현한 포스터입니다." },
  { title: "Think Again", category: "Poster", year: "2026", client: "Poster Project", color: "c-red", image: "./images/Poster Project 1_ Complex.jpg", description: "생각이 많아 방향을 잃는 감각을 달팽이와 뇌, 반복되는 문장으로 시각화한 실험적인 포스터입니다." },
  { title: "HWF Riso Workshop 01", category: "Printing", year: "2025", client: "HWF", color: "c-pink", image: "./images/hwf riso workshop_1.jpg", description: "참여자들이 직접 두 가지 별색을 조합하고 인쇄물을 조립하며 리소그래프의 우연성을 경험한 워크숍입니다." },
  { title: "Pan’s Labyrinth", category: "Poster", year: "2025", client: "Personal Project", color: "c-green", image: "./images/flimthefloor_pans labyrnth.jpg", description: "영화의 인상적인 장면과 감각을 새로운 그래픽 언어로 번역한 Film the Floor 시리즈입니다." },
  { title: "Save the Green Planet", category: "Poster", year: "2025", client: "Personal Project", color: "c-yellow", image: "./images/flimthefloor_save the green planet.jpg", description: "영화 속 색과 질감, 서사의 단서를 한 화면 안에 재배치한 Film the Floor 프로젝트입니다." },
  { title: "The Lobster", category: "Poster", year: "2025", client: "Personal Project", color: "c-coral", image: "./images/flimthefloor_the lobster.jpg", description: "The Lobster의 낯선 분위기와 상징을 시각적 구조와 이미지의 리듬으로 재해석했습니다." },
  { title: "Where Is My Home?", category: "Poster", year: "2026", client: "Poster Project", color: "c-pink", image: "./images/Poster Project 3_idea.jpg", description: "둥지를 떠나는 새의 비행과 방향을 강렬한 핑크, 녹색, 망점 이미지로 표현한 포스터입니다." },
  { title: "OHYUNG Seendosi", category: "Poster", year: "2026", client: "Ohyung", color: "c-blue", image: "./images/poster_Ohyung_2026.jpg", description: "Ohyung을 위해 제작한 2026년 포스터 프로젝트입니다. 강렬한 이미지와 타이포그래피의 리듬을 함께 구성했습니다." },
  { title: "Spring Coming Keyring", category: "Goods", year: "2026", client: "Personal Project", color: "c-green", image: "./images/Spring Coming Keyring_2_2026.JPG", description: "봄이 다가오는 감각을 작은 그래픽 오브젝트로 옮긴 키링 프로젝트입니다." },
  { title: "Concrete Lab", category: "Poster", year: "2026", client: "Concrete Lab", color: "c-lilac", image: "./images/Poster_concretelabflyer_2026.jpg", description: "Concrete Lab의 시각적 리듬과 공간적 인상을 하나의 포스터 화면으로 재구성했습니다." },
  { title: "Melt Down", category: "Poster", year: "2024", client: "Personal Project", color: "c-coral", image: "./images/Poster_melt down_2024.jpg", description: "Melt Down 프로젝트의 시각 언어를 포스터 형식으로 확장한 2024년 작업입니다." },
  { title: "Melting Down T-Shirt", category: "Goods", year: "2026", client: "Personal Project", color: "c-sky", image: "./images/MTD Tshirt_2_2026.jpg", description: "MTD의 그래픽 언어를 일상적인 티셔츠 오브젝트로 확장한 2026년 작업입니다." },
  { title: "Deploy", category: "Poster", year: "2021", client: "Personal Project", color: "c-red", image: "./images/poster_deploy_2021.jpg", description: "이미지와 타이포그래피의 관계를 실험한 2021년 Deploy 포스터 프로젝트입니다." },
  { title: "CHANGGWI", category: "Printing", year: "2025", client: "Personal Project", color: "c-red", image: "./images/book_CHANGGWI_2_2025.jpg", description: "CHANGGWI의 서사와 시각적 분위기를 편집 구성으로 풀어낸 2025년 북 프로젝트입니다." },
  { title: "Magazine Peel", category: "Printing", year: "2022", client: "Personal Project", color: "c-lilac", image: "./images/Magazine Peel_2022.jpg", description: "Magazine Peel의 편집 구조와 이미지, 타이포그래피의 관계를 탐구한 2022년 매거진 프로젝트입니다." }
];

const body = document.body;
const panel = document.querySelector(".project-panel");
const panelImage = panel.querySelector(".panel-image");
const title = panel.querySelector("h3");
const category = panel.querySelector(".panel-category");
const description = panel.querySelector(".panel-description");
const client = panel.querySelector(".panel-client");
const year = panel.querySelector(".panel-year");
let lastFocused = null;

const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
const supportsFinePointer = window.matchMedia("(hover: hover) and (pointer: fine)");
let scrollTarget = window.scrollY;
let scrollCurrent = window.scrollY;
let scrollFrame = null;

function maxScroll() {
  return Math.max(0, document.documentElement.scrollHeight - window.innerHeight);
}

function runInertiaScroll() {
  const distance = scrollTarget - scrollCurrent;
  scrollCurrent += distance * 0.085;

  if (Math.abs(distance) < 0.5) {
    scrollCurrent = scrollTarget;
    window.scrollTo(0, scrollTarget);
    scrollFrame = null;
    return;
  }

  window.scrollTo(0, scrollCurrent);
  scrollFrame = requestAnimationFrame(runInertiaScroll);
}

function inertiaScrollTo(position) {
  scrollTarget = Math.min(Math.max(position, 0), maxScroll());
  if (reduceMotion.matches || !supportsFinePointer.matches) {
    scrollCurrent = scrollTarget;
    window.scrollTo(0, scrollTarget);
    return;
  }
  if (!scrollFrame) {
    scrollCurrent = window.scrollY;
    scrollFrame = requestAnimationFrame(runInertiaScroll);
  }
}

window.addEventListener("wheel", (event) => {
  if (
    reduceMotion.matches ||
    !supportsFinePointer.matches ||
    event.ctrlKey ||
    body.classList.contains("panel-open") ||
    event.target.closest(".project-panel")
  ) return;

  event.preventDefault();
  if (!scrollFrame) {
    scrollCurrent = window.scrollY;
    scrollTarget = window.scrollY;
  }
  scrollTarget = Math.min(Math.max(scrollTarget + event.deltaY, 0), maxScroll());
  if (!scrollFrame) scrollFrame = requestAnimationFrame(runInertiaScroll);
}, { passive: false });

document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener("click", (event) => {
    const targetId = link.getAttribute("href");
    const target = targetId === "#" ? document.body : document.querySelector(targetId);
    if (!target) return;

    event.preventDefault();
    inertiaScrollTo(target.getBoundingClientRect().top + window.scrollY);
    window.history.replaceState(null, "", targetId);
  });
});

function openProject(index) {
  const project = projects[index];
  lastFocused = document.activeElement;
  panelImage.src = project.image;
  panelImage.alt = `${project.title} 프로젝트 이미지`;
  title.textContent = project.title;
  title.classList.toggle("is-long-title", project.title.length > 18);
  category.textContent = `${project.category} · ${project.year}`;
  description.textContent = project.description;
  client.textContent = project.client;
  year.textContent = project.year;
  panel.setAttribute("aria-hidden", "false");
  body.classList.add("panel-open");
  panel.querySelector(".panel-close").focus();
}

function closeProject() {
  body.classList.remove("panel-open");
  panel.setAttribute("aria-hidden", "true");
  if (lastFocused) lastFocused.focus();
}

document.querySelectorAll(".project-card").forEach((card) => {
  card.addEventListener("click", () => openProject(Number(card.dataset.project)));
});

document.querySelectorAll("[data-close-panel]").forEach((el) => {
  el.addEventListener("click", closeProject);
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && body.classList.contains("panel-open")) closeProject();
});

document.querySelectorAll("[data-filter]").forEach((link) => {
  link.addEventListener("click", () => {
    const type = link.dataset.filter;
    const cards = document.querySelectorAll(".project-card");
    let visibleIndex = 0;

    document.querySelectorAll("[data-filter]").forEach((filterLink) => {
      filterLink.removeAttribute("aria-current");
    });
    link.setAttribute("aria-current", "true");

    cards.forEach((card) => {
      const project = projects[Number(card.dataset.project)];
      const match = type === "all" || project.category.toLowerCase() === type;
      card.hidden = !match;
      card.classList.remove("filter-enter", "filter-slot-1", "filter-slot-2", "filter-slot-3");
      if (match) {
        card.classList.add(`filter-slot-${visibleIndex % 3 + 1}`);
        visibleIndex += 1;
        void card.offsetWidth;
        card.classList.add("filter-enter");
      }
    });
  });
});
