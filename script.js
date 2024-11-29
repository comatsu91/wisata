// Fungsi untuk menangani fade-in saat elemen terlihat di viewport
function handleIntersection(entries, observer) {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("fade-in");
      observer.unobserve(entry.target);
    }
  });
}

// Membuat Intersection Observer untuk animasi fade-in
const observer = new IntersectionObserver(handleIntersection, {
  threshold: 0.1,
});

// Mengamati setiap elemen dengan kelas "fade-in-section"
document.querySelectorAll(".fade-in-section").forEach((section) => {
  observer.observe(section);
});

// Listener untuk DOMContentLoaded event
document.addEventListener("DOMContentLoaded", () => {
  // Toggle navbar untuk tampilan mobile
  const navbarToggler = document.getElementById("navbarToggler");
  const navbarNav = document.getElementById("navbarNav");

  if (navbarToggler && navbarNav) {
    navbarToggler.addEventListener("click", () => {
      navbarNav.classList.toggle("active");
    });
  }

  // Menangani transparansi navbar saat scroll
  const navbar = document.getElementById("navbar");
  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      navbar.classList.add("scrolled");
      navbar.classList.remove("transparent");
    } else {
      navbar.classList.add("transparent");
      navbar.classList.remove("scrolled");
    }
  });

  // Fungsionalitas carousel
  let slideIndex = 0;

  function showSlides(n) {
    const slides = document.querySelectorAll(".carousel-slide img");
    if (n >= slides.length) slideIndex = 0;
    if (n < 0) slideIndex = slides.length - 1;

    slides.forEach((slide, index) => {
      slide.style.transform = `translateX(${(index - slideIndex) * 100}%)`;
    });
  }

  function plusSlides(n) {
    showSlides((slideIndex += n));
  }

  // Mengatur fungsi next dan prev pada tombol navigasi
  const prevButton = document.querySelector(".prev");
  const nextButton = document.querySelector(".next");

  if (prevButton) {
    prevButton.addEventListener("click", () => plusSlides(-1));
  }

  if (nextButton) {
    nextButton.addEventListener("click", () => plusSlides(1));
  }

  // Fungsionalitas lightbox
  const lightbox = document.getElementById("lightbox");
  const lightboxImage = document.getElementById("lightboxImage");
  const lightboxClose = document.querySelector(".lightbox .close");

  document.querySelectorAll(".carousel-slide img").forEach((image) => {
    image.addEventListener("click", () => {
      lightbox.style.display = "block";
      lightboxImage.src = image.src;
    });
  });

  if (lightboxClose) {
    lightboxClose.addEventListener("click", () => {
      lightbox.style.display = "none";
    });
  }

  // Validasi form
  const contactForm = document.getElementById("contactForm");
  const newsletterForm = document.getElementById("newsletterForm");

  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      const name = document.getElementById("name").value;
      const email = document.getElementById("email").value;
      const message = document.getElementById("message").value;

      if (!name || !email || !message) {
        e.preventDefault();
        alert("Please fill out all fields.");
      }
    });
  }

  if (newsletterForm) {
    newsletterForm.addEventListener("submit", (e) => {
      const email = e.target.querySelector('input[type="email"]').value;

      if (!email) {
        e.preventDefault();
        alert("Please enter your email.");
      } else {
        alert("Thank you for subscribing!");
      }
    });
  }

  // Animasi scroll untuk fade-in sections
  const fadeInElements = document.querySelectorAll(".fade-in-section");

  function handleScroll() {
    fadeInElements.forEach((element) => {
      const elementTop = element.getBoundingClientRect().top;
      const viewportHeight = window.innerHeight;

      if (elementTop < viewportHeight - 100) {
        element.classList.add("fade-in");
      } else {
        element.classList.remove("fade-in");
      }
    });
  }

  window.addEventListener("scroll", handleScroll);
  window.addEventListener("load", handleScroll);

  // Menampilkan dan menyembunyikan form login dan register
  const loginButton = document.getElementById("loginButton");
  const registerButton = document.getElementById("registerButton");
  const loginForm = document.getElementById("loginForm");
  const registerForm = document.getElementById("registerForm");
  const loginClose = document.getElementById("loginClose");
  const registerClose = document.getElementById("registerClose");

  if (loginButton) {
    loginButton.addEventListener("click", () => {
      if (loginForm) {
        loginForm.style.display = "block";
      }
    });
  }

  if (registerButton) {
    registerButton.addEventListener("click", () => {
      if (registerForm) {
        registerForm.style.display = "block";
      }
    });
  }

  if (loginClose) {
    loginClose.addEventListener("click", () => {
      if (loginForm) {
        loginForm.style.display = "none";
      }
    });
  }

  if (registerClose) {
    registerClose.addEventListener("click", () => {
      if (registerForm) {
        registerForm.style.display = "none";
      }
    });
  }

  // Menutup modal saat mengklik di luar modal
  window.addEventListener("click", (event) => {
    if (event.target === loginForm) {
      loginForm.style.display = "none";
    }
    if (event.target === registerForm) {
      registerForm.style.display = "none";
    }
  });
});

// Fungsi untuk otomatisasi slide pada carousel
let slideIndex = 2;
showSlides(slideIndex);

const slideCount = document.querySelectorAll(".carousel-item").length;
const indicators = document.querySelector(".carousel-indicators");

// Loop untuk membuat indikator dot
for (let i = 0; i < slideCount; i++) {
  const dot = document.createElement("span");
  dot.classList.add("dot");
  dot.onclick = () => currentSlide(i + 1);
  indicators.appendChild(dot);
}

// Fungsi untuk mengubah slide dengan menambahkan nilai n ke slideIndex
function changeSlide(n) {
  showSlides((slideIndex += n));
}

// Fungsi untuk menampilkan slide yang sesuai dengan slideIndex saat ini
function currentSlide(n) {
  showSlides((slideIndex = n));
}

// Fungsi untuk menampilkan slide
function showSlides(n) {
  let slides = document.querySelectorAll(".carousel-item");
  let dots = document.querySelectorAll(".dot");

  // Memastikan slideIndex berada dalam rentang yang valid
  if (n > slides.length) slideIndex = 1;
  if (n < 1) slideIndex = slides.length;

  // Menghapus kelas aktif dari semua slide dan indikator
  slides.forEach((slide) => {
    slide.classList.remove("active");
  });
  dots.forEach((dot) => {
    dot.classList.remove("active");
  });

  // Menambahkan kelas aktif ke slide dan indikator yang sesuai
  slides[slideIndex - 1].classList.add("active");
  dots[slideIndex - 1].classList.add("active");

  // Menghitung offset untuk posisi slide yang aktif
  let offset = -(slideIndex - 2) * 33.33;
  document.querySelector(
    ".carousel-slide"
  ).style.transform = `translateX(${offset}%)`;
}

setInterval(() => {
  changeSlide(1);
}, 3000);

document.addEventListener("DOMContentLoaded", function () {
  // Fungsionalitas carousel testimoni
  const testimoniItems = document.querySelectorAll(".testimoni-item");
  let testimoniIndex = 0;

  function showTestimoniSlides(n) {
    const testimoniInner = document.querySelector(".testimoni-inner");
    if (n >= testimoniItems.length) testimoniIndex = 0;
    if (n < 0) testimoniIndex = testimoniItems.length - 1;

    testimoniInner.style.transform = `translateX(-${testimoniIndex * 100}%)`;
  }

  function nextTestimoni() {
    testimoniIndex = (testimoniIndex + 1) % testimoniItems.length;
    showTestimoniSlides(testimoniIndex);
  }

  showTestimoniSlides(testimoniIndex); // Show the first item initially

  setInterval(nextTestimoni, 5000); // Ganti slide setiap 5 detik
});
