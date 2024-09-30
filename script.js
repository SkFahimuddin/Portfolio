const site_wide_cursor = document.querySelector('.custom-cursor.site-wide');

document.addEventListener('mouseenter', () => {
    site_wide_cursor.style.display = 'block';
});

document.addEventListener('mouseleave', () => {
    site_wide_cursor.style.display = 'none';
});

document.addEventListener('mousemove', TrackCursor);

document.addEventListener('mousedown', () => site_wide_cursor.classList.add('active'));
document.addEventListener('mouseup', () => site_wide_cursor.classList.remove('active'));

let lastX = 0, lastY = 0, isMoving = false;

function TrackCursor(evt) {
    const speed = 1;

    const targetX = evt.clientX - site_wide_cursor.clientWidth / 2;
    const targetY = evt.clientY - site_wide_cursor.clientHeight / 2;

    lastX += (targetX - lastX) * speed;
    lastY += (targetY - lastY) * speed;

    site_wide_cursor.style.transform = `translate(${lastX}px, ${lastY}px)`;

    if (!isMoving) {
        isMoving = true;
        requestAnimationFrame(() => {
            isMoving = false;
        });
    }
}

// Apply hover effect for nav buttons
const navButtons = document.querySelectorAll('.nav_buttons a');

for (let i = 0; i < navButtons.length; i++) {
    const button = navButtons[i];

    button.addEventListener('mouseenter', () => {
        site_wide_cursor.style.border = '2px solid black';
        site_wide_cursor.querySelector('.pointer').style.backgroundColor = 'black';
    });

    button.addEventListener('mouseleave', () => {
        site_wide_cursor.style.border = '2px solid white';
        site_wide_cursor.querySelector('.pointer').style.backgroundColor = 'white';
    });
}

// Apply the same hover effect for social bar buttons
const socialButtons = document.querySelectorAll('.social_bar button');

for (let i = 0; i < socialButtons.length; i++) {
    const button = socialButtons[i];

    button.addEventListener('mouseenter', () => {
        site_wide_cursor.style.border = '2px solid black';
        site_wide_cursor.querySelector('.pointer').style.backgroundColor = 'black';
    });

    button.addEventListener('mouseleave', () => {
        site_wide_cursor.style.border = '2px solid white';
        site_wide_cursor.querySelector('.pointer').style.backgroundColor = 'white';
    });
}

// Apply hover effect for <input type="submit">
const submitButtons = document.querySelectorAll('input[type="submit"]');

for (let i = 0; i < submitButtons.length; i++) {
    const button = submitButtons[i];

    button.addEventListener('mouseenter', () => {
        site_wide_cursor.style.border = '2px solid black';
        site_wide_cursor.querySelector('.pointer').style.backgroundColor = 'black';
    });

    button.addEventListener('mouseleave', () => {
        site_wide_cursor.style.border = '2px solid white';
        site_wide_cursor.querySelector('.pointer').style.backgroundColor = 'white';
    });
}

document.addEventListener('DOMContentLoaded', function () {
    const aboutPic = document.getElementById('about_pic');
    const aboutInfo = document.getElementById('about_info');
    const projectOtto = document.getElementById('project_otto');
    const projectJarvis = document.getElementById('project_jarvis');
    const projectPagepallet = document.getElementById('project_pagepallet');
    const projectFittech = document.getElementById('project_fittech');

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                if (entry.target === aboutPic) {
                    aboutPic.classList.add('visible'); // Show about_pic
                }
                if (entry.target === aboutInfo) {
                    aboutInfo.classList.add('visible'); // Show about_info
                }
                if (entry.target === projectOtto) {
                    projectOtto.classList.add('visible'); // Show about_pic
                }
                if (entry.target === projectOtto) {
                    projectJarvis.classList.add('visible'); // Show about_pic
                }
                if (entry.target === projectOtto) {
                    projectPagepallet.classList.add('visible'); // Show about_pic
                }
                if (entry.target === projectOtto) {
                    projectFittech.classList.add('visible'); // Show about_pic
                }
                observer.unobserve(entry.target); // Stop observing once it's visible
            }
        });
    });

    observer.observe(aboutPic); // Start observing the about_pic div
    observer.observe(aboutInfo);
    observer.observe(projectJarvis);
    observer.observe(projectPagepallet);
    observer.observe(projectOtto);
    observer.observe(projectFittech); // Start observing the about_info div
});


const roles = [
    "Web Developer",
    "UI/UX Designer",
    "Artificial Intelligence Engineer"
];

let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;
let delay = 200;  // Typing delay

function typeRole() {
    const currentRole = roles[roleIndex];
    const roleSpan = document.getElementById("role");
    const staticLetter = document.getElementById("static-letter");

    // Typing or deleting effect
    if (isDeleting) {
        roleSpan.textContent = currentRole.substring(0, charIndex);
        charIndex--;
    } else {
        roleSpan.textContent = currentRole.substring(0, charIndex + 1);
        charIndex++;
    }

    // Check if the current role is "Artificial Intelligence Engineer"
    if (currentRole === "Artificial Intelligence Engineer") {
        staticLetter.textContent = "An";  // Change "A" to "An"
    } else {
        staticLetter.textContent = "A";  // Keep it as "A" for other roles
    }

    // Change delay for typing/deleting effect
    if (!isDeleting && charIndex === currentRole.length) {
        delay = 1000;  // Pause at the end of the word
        isDeleting = true;  // Start deleting after pause
    } else if (isDeleting && charIndex === 0) {
        delay = 500;  // Short pause before typing the next word
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;  // Move to next word
    } else {
        delay = isDeleting ? 100 : 200;  // Adjust speed
    }

    setTimeout(typeRole, delay);
}

// Start the typing effect when the page loads
document.addEventListener("DOMContentLoaded", typeRole);




document.getElementById('contact-form').addEventListener('submit', function(event) {
    event.preventDefault();

    // Collect form data
    const firstName = document.getElementById('first-name').value;
    const lastName = document.getElementById('last-name').value;
    const email = document.getElementById('con_email').value;
    const phone = document.getElementById('phone').value;
    const message = document.getElementById('message').value;

    // Send email using EmailJS
    emailjs.send("service_zypq8jp", "template_vbzcz38", {
        first_name: firstName,
        last_name: lastName,
        email: email,
        phone: phone,
        message: message
    })
    .then(function(response) {
        document.getElementById('status').innerHTML = "Message sent successfully!";
    }, function(error) {
        document.getElementById('status').innerHTML = "Failed to send message.";
    });
});