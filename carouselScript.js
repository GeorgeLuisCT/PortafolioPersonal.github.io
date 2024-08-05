var isDragging = false;
var startX;
var scale = 0.5;

var distanceItems = '22vw'

var carousel = document.getElementById('carousel');
var items = Array.from(carousel.children);

carousel.addEventListener('mousedown', handleDragStart);
document.addEventListener('mouseup', handleDragEnd);
document.addEventListener('mousemove', handleDragMove);
carousel.addEventListener('selectstart', function (e) {
    e.preventDefault();
});

// Eventos táctiles
carousel.addEventListener('touchstart', handleTouchStart);
document.addEventListener('touchend', handleTouchEnd);
document.addEventListener('touchmove', handleTouchMove);

items.forEach(function (item, index) {
    item.addEventListener('mousedown', function (mousedownEvent) {
        handleItemClick(mousedownEvent, index);
    });
    // Evento táctil para ítems
    item.addEventListener('touchstart', function (touchstartEvent) {
        handleItemClick(touchstartEvent, index);
    });
});

function handleDragStart(e) {
    isDragging = true;
    startX = e.clientX;
    document.body.style.cursor = 'grabbing';
}

function handleTouchStart(e) {
    isDragging = true;
    startX = e.touches[0].clientX;
}

function handleDragEnd() {
    isDragging = false;
    document.body.style.cursor = 'auto';
}

function handleTouchEnd() {
    isDragging = false;
}

function handleDragMove(e) {
    if (isDragging) {
        var deltaX = (e.clientX - startX) * scale;
        startX = e.clientX;

        var currentRotation = parseFloat(carousel.style.getPropertyValue('--rotation') || 0);

        if (currentRotation > 360 || currentRotation < -360) {
            currentRotation = 0;
        }

        updateCarouselRotation(deltaX, currentRotation);
    }
}

function handleTouchMove(e) {
    if (isDragging) {
        var deltaX = (e.touches[0].clientX - startX) * scale;
        startX = e.touches[0].clientX;

        var currentRotation = parseFloat(carousel.style.getPropertyValue('--rotation') || 0);

        if (currentRotation > 360 || currentRotation < -360) {
            currentRotation = 0;
        }

        updateCarouselRotation(deltaX, currentRotation);
    }
}

function handleItemClick(mousedownEvent, index) {
    var isMouseDown = true;
    var startX = mousedownEvent.clientX || mousedownEvent.touches[0].clientX;

    document.addEventListener('mousemove', function (mousemoveEvent) {
        if (isMouseDown) {
            var currentX = mousemoveEvent.clientX;
            var dragDistance = Math.abs(currentX - startX);

            if (dragDistance > 5) {
                isMouseDown = false;
            }
        }
    });

    document.addEventListener('touchmove', function (touchmoveEvent) {
        if (isMouseDown) {
            var currentX = touchmoveEvent.touches[0].clientX;
            var dragDistance = Math.abs(currentX - startX);

            if (dragDistance > 5) {
                isMouseDown = false;
            }
        }
    });

    document.addEventListener('mouseup', function () {
        if (isMouseDown) {
            handleItemClickEnd(index);
        }

        isMouseDown = false;
    });

    document.addEventListener('touchend', function () {
        if (isMouseDown) {
            handleItemClickEnd(index);
        }

        isMouseDown = false;
    });
}

function handleItemClickEnd(index) {
    var currentRotation = parseFloat(carousel.style.getPropertyValue('--rotation') || 0);

    var anglePerItem = 360 / items.length;
    var targetRotation;

    var val1 = 360 - (index * anglePerItem);
    var val2 = index * -anglePerItem;

    var diff1 = Math.abs(currentRotation - val1);
    var diff2 = Math.abs(currentRotation - val2);

    if (currentRotation === 0 && index === items.length - 1) {
        rotateCarousel(360 / items.length);
    } else if (index === 0 && currentRotation < -180) {
        rotateCarousel(-360);
    } else {
        if (diff1 < diff2) {
            targetRotation = val1;
        } else {
            targetRotation = val2;
        }

        rotateCarousel(targetRotation);
    }
}

function updateCarouselRotation(deltaX, currentRotation) {
    carousel.style.transform = 'rotateY(' + (currentRotation + deltaX) + 'deg)';
    carousel.style.setProperty('--rotation', currentRotation + deltaX);

    items.forEach(function (item, index) {
        var angle = index * (360 / items.length);
        var rotation = angle + currentRotation;
        var translation = 'translateZ(' + distanceItems + ') rotateY(' + -rotation + 'deg)';
        item.style.transform = 'rotateY(' + angle + 'deg) ' + translation;
    });
}

function rotateCarousel(rotation) {
    carousel.style.transition = 'transform 0.5s ease-in-out';
    carousel.style.transform = 'rotateY(' + rotation + 'deg)';
    carousel.style.setProperty('--rotation', rotation);

    var currentRotation = parseFloat(carousel.style.getPropertyValue('--rotation') || 0);

    function handleTransitionEnd() {
        carousel.style.transition = '';
        carousel.removeEventListener('transitionend', handleTransitionEnd);

        items.forEach(function (item) {
            item.style.transition = '';
        });

        if (currentRotation === 360 || currentRotation === -360) {
            resetCarousel(0);
        }
    }

    carousel.addEventListener('transitionend', handleTransitionEnd);

    items.forEach(function (item, index) {
        var angle = index * (360 / items.length);
        var rotation = angle + currentRotation;
        var translation = 'translateZ(' + distanceItems + ') rotateY(' + -rotation + 'deg)';
        item.style.transition = 'transform 0.5s ease-in-out';
        item.style.transform = 'rotateY(' + angle + 'deg) ' + translation;
    });
}

function resetCarousel(rotation) {
    carousel.style.transform = 'rotateY(' + rotation + 'deg)';
    carousel.style.setProperty('--rotation', rotation);

    items.forEach(function (item, index) {
        var angle = index * (360 / items.length);
        var translation = 'translateZ(' + distanceItems + ') rotateY(-' + angle + 'deg)';
        item.style.transform = 'rotateY(' + angle + 'deg) ' + translation;
    });
}
