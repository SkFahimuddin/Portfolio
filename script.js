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
