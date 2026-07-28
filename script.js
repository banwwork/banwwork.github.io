const projects = [
  { title: "Melting Down", category: "Book", year: "2025", client: "Personal Project", color: "c-blue", image: "./images/MTD_book_1.jpg", description: "핑크와 블루 두 가지 색을 중심으로 제작한 리소그래프 북입니다. 녹아내리는 여름의 감각을 인물과 작은 오브젝트의 이야기로 구성했습니다." },
  { title: "Melting Down Objects", category: "Goods", year: "2025", client: "Personal Project", color: "c-pink", image: "./images/MTD_MD_1.jpg", description: "Melting Down의 그래픽을 일상에서 사용할 수 있는 키링과 작은 오브젝트로 확장한 프로젝트입니다." },
  { title: "Melting Down Calendar", category: "Goods", year: "2025", client: "Personal Project", color: "c-sky", image: "./images/MTD_MD_2.jpg", description: "프로젝트의 리소그래프 이미지를 작은 캘린더 형태로 재구성해 휴대 가능한 오브젝트로 제작했습니다." },
  { title: "Fledgling Season", category: "Poster", year: "2026", client: "Poster Project", color: "c-blue", image: "./images/Poster Project 2_idea.jpg", description: "학이 둥지를 떠나 처음 비행하는 시기를 강렬한 블루와 세밀한 드로잉으로 표현한 포스터입니다." },
  { title: "Think Again", category: "Poster", year: "2026", client: "Poster Project", color: "c-red", image: "./images/Poster Project 1_ Complex.jpg", description: "생각이 많아 방향을 잃는 감각을 달팽이와 뇌, 반복되는 문장으로 시각화한 실험적인 포스터입니다." },
  { title: "HWF Riso Workshop 01", category: "Workshop", year: "2025", client: "HWF", color: "c-pink", image: "./images/hwf riso workshop_1.jpg", description: "참여자들이 직접 두 가지 별색을 조합하고 인쇄물을 조립하며 리소그래프의 우연성을 경험한 워크숍입니다." },
  { title: "Pan’s Labyrinth", category: "Film the Floor", year: "2025", client: "Personal Project", color: "c-green", image: "./images/flimthefloor_pans labyrnth.jpg", description: "영화의 인상적인 장면과 감각을 새로운 그래픽 언어로 번역한 Film the Floor 시리즈입니다." },
  { title: "Save the Green Planet", category: "Film the Floor", year: "2025", client: "Personal Project", color: "c-yellow", image: "./images/flimthefloor_save the green planet.jpg", description: "영화 속 색과 질감, 서사의 단서를 한 화면 안에 재배치한 Film the Floor 프로젝트입니다." },
  { title: "The Lobster", category: "Film the Floor", year: "2025", client: "Personal Project", color: "c-coral", image: "./images/flimthefloor_the lobster.jpg", description: "The Lobster의 낯선 분위기와 상징을 시각적 구조와 이미지의 리듬으로 재해석했습니다." }
];

const body = document.body;
const panel = document.querySelector(".project-panel");
const visual = panel.querySelector(".panel-visual");
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
  visual.className = `panel-visual ${project.color}`;
  panelImage.src = project.image;
  panelImage.alt = `${project.title} 프로젝트 이미지`;
  title.textContent = project.title;
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
    document.querySelectorAll(".project-card").forEach((card, index) => {
      const match = projects[index].category.toLowerCase() === type;
      card.classList.remove("flash");
      if (match) {
        window.setTimeout(() => card.animate(
          [{ transform: "translateY(0)" }, { transform: "translateY(-12px)" }, { transform: "translateY(0)" }],
          { duration: 600, easing: "ease-out" }
        ), 450);
      }
    });
  });
});
