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
