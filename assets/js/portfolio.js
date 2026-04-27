(function() {
	var progress = document.querySelector('.scroll-progress');
	var glow = document.querySelector('.cursor-glow');
	var revealItems = Array.prototype.slice.call(document.querySelectorAll('.reveal-on-scroll'));

	window.addEventListener('load', function() {
		document.body.classList.remove('is-preload');
	});

	function updateProgress() {
		if (!progress) return;

		var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
		var scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
		var percent = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;
		progress.style.width = percent + '%';
	}

	if ('IntersectionObserver' in window) {
		var observer = new IntersectionObserver(function(entries) {
			entries.forEach(function(entry) {
				if (entry.isIntersecting) {
					entry.target.classList.add('is-visible');
					observer.unobserve(entry.target);
				}
			});
		}, { threshold: 0.16 });

		revealItems.forEach(function(item) {
			observer.observe(item);
		});
	} else {
		revealItems.forEach(function(item) {
			item.classList.add('is-visible');
		});
	}

	window.addEventListener('scroll', updateProgress, { passive: true });
	window.addEventListener('resize', updateProgress);
	updateProgress();

	if (glow && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
		window.addEventListener('pointermove', function(event) {
			glow.style.transform = 'translate3d(' + event.clientX + 'px, ' + event.clientY + 'px, 0) translate(-50%, -50%)';
		}, { passive: true });
	}
})();
