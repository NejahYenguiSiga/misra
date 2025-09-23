// Production contact script (Zoho Desk submission)

document.addEventListener('DOMContentLoaded', function() {
	const contactForm = document.getElementById('contactForm');

	function logLine(msg){/* no-op in production */}

	if (contactForm) {
		const isZohoDesk = /^https?:\/\/desk\.zoho\.com\/support\/WebToCase/i.test(contactForm.getAttribute('action') || '');
		if (isZohoDesk) {
			contactForm.addEventListener('submit', function() {
				logLine('Submitting to Zoho Desk...');
				const submitBtn = contactForm.querySelector('button[type="submit"]');
				if (submitBtn) {
					submitBtn.disabled = true;
					submitBtn.innerHTML = '<span class="icon-left">⏳</span>Sending...';
				}
				let overlay = document.getElementById('formLoading');
				if (overlay) { overlay.style.display = 'flex'; }
			});
		} else {
			const status = document.getElementById('formStatus');
			if (status) status.textContent = 'Submission disabled: backend not configured.';
			contactForm.addEventListener('submit', function(e){ e.preventDefault(); });
		}
	}
});

// Language switching
const translations = {
    en: {
        'nav.home': 'Home',
        'nav.poultry': 'Poultry',
        'nav.olive': 'Olive',
        'nav.export': 'Export',
        'nav.zerotrace': 'Zero Trace',
        'nav.contact': 'Contact',
        'footer.reserved': 'All rights reserved.'
    },
    fr: {
        'nav.home': 'Accueil',
        'nav.poultry': 'Volaille',
        'nav.olive': 'Olive',
        'nav.export': 'Export',
        'nav.zerotrace': 'Zero Trace',
        'nav.contact': 'Contact',
        'footer.reserved': 'Tous droits réservés.'
    },
    es: {
        'nav.home': 'Inicio',
        'nav.poultry': 'Aves',
        'nav.olive': 'Oliva',
        'nav.export': 'Exportación',
        'nav.zerotrace': 'Zero Trace',
        'nav.contact': 'Contacto',
        'footer.reserved': 'Todos los derechos reservados.'
    },
    de: {
        'nav.home': 'Startseite',
        'nav.poultry': 'Geflügel',
        'nav.olive': 'Olive',
        'nav.export': 'Export',
        'nav.zerotrace': 'Zero Trace',
        'nav.contact': 'Kontakt',
        'footer.reserved': 'Alle Rechte vorbehalten.'
    },
    ar: {
        'nav.home': 'الرئيسية',
        'nav.poultry': 'الدواجن',
        'nav.olive': 'الزيتون',
        'nav.export': 'التصدير',
        'nav.zerotrace': 'زيرو تريس',
        'nav.contact': 'اتصل بنا',
        'footer.reserved': 'جميع الحقوق محفوظة.'
    }
};

// Example main translations (data-i18n) based on repo
const i18n = {
	en: {
		'meta.title': 'Zero Trace — B2B Cleaning & Sanitization',
		'meta.description': 'Zero Trace provides professional B2B deep cleaning, disinfection, odor control, and eco-conscious sanitization for industrial sectors.',
		'insights.eyebrow': 'Insights',
		'insights.title': 'Guides & Best Practices',
		'insights.intro': 'Practical, verifiable methods we use across industrial environments.',
		'insights.a1.title': 'ATP Testing for Sanitization: Thresholds and Reporting',
		'insights.a1.desc': 'Why ATP matters, how we sample, and the pass/fail ranges we target in high‑risk zones.',
		'insights.a1.cta': 'Talk to an expert',
		'insights.a2.title': 'Odor Control in Municipal Waste Sites: A Practical Playbook',
		'insights.a2.desc': 'Source identification, neutralization chemistry, and measurable suppression metrics.',
		'insights.a2.cta': 'Request the full SOP',
		'faq.eyebrow': 'FAQ',
		'faq.title': 'Common Questions',
		'faq.q1': 'Which industries do you serve?',
		'faq.a1': 'We support poultry farms, olive‑oil presses, hotels and municipal waste sites with compliance‑first cleaning.',
		'faq.q2': 'Do you provide emergency cleaning?',
		'faq.a2': 'Yes. We mobilize rapid containment and disinfection protocols for critical events.',
		'faq.q3': 'How can we request a quote?',
		'faq.a3': 'Use the contact form or email contact@zerotrace.tn with your site details. We reply within one business day.'
	},
	fr: {
		'meta.title': 'Zero Trace — Nettoyage & Désinfection B2B',
		'meta.description': 'Zero Trace fournit un nettoyage, une désinfection, un contrôle des odeurs et une sanitation écoresponsable pour les secteurs industriels.',
		'insights.eyebrow': 'Analyses',
		'insights.title': 'Guides & Bonnes Pratiques',
		'insights.intro': 'Des méthodes concrètes et vérifiables que nous appliquons sur le terrain.',
		'insights.a1.title': "Tests ATP pour la désinfection : seuils et rapports",
		'insights.a1.desc': "Pourquoi l’ATP compte, notre échantillonnage et les seuils visés.",
		'insights.a1.cta': 'Parler à un expert',
		'insights.a2.title': "Contrôle des odeurs en décharges : guide pratique",
		'insights.a2.desc': "Identification des sources, chimie de neutralisation et métriques mesurables.",
		'insights.a2.cta': 'Demander la procédure complète',
		'faq.eyebrow': 'FAQ',
		'faq.title': 'Questions fréquentes',
		'faq.q1': 'Quels secteurs servez-vous ?',
		'faq.a1': 'Élevages avicoles, huileries, hôtels et sites de déchets municipaux.',
		'faq.q2': 'Intervention d’urgence ?',
		'faq.a2': 'Oui, protocoles rapides de confinement et désinfection.',
		'faq.q3': 'Comment demander un devis ?',
		'faq.a3': 'Formulaire de contact ou contact@zerotrace.tn — réponse sous 1 jour ouvré.'
	},
	es: {
		'meta.title': 'Zero Trace — Limpieza y Desinfección B2B',
		'meta.description': 'Zero Trace ofrece limpieza profunda B2B, desinfección, control de olores y sanitización eco-responsable.',
		'insights.eyebrow': 'Ideas',
		'insights.title': 'Guías y Mejores Prácticas',
		'insights.intro': 'Métodos prácticos y verificables que usamos en entornos industriales.',
		'insights.a1.title': 'Pruebas ATP para Sanitización: Umbrales e Informes',
		'insights.a1.desc': 'Por qué importa ATP, cómo muestreamos y los rangos objetivo.',
		'insights.a1.cta': 'Hablar con un experto',
		'insights.a2.title': 'Control de Olores en Residuos Municipales',
		'insights.a2.desc': 'Identificación de fuentes, neutralización y métricas medibles.',
		'insights.a2.cta': 'Solicitar el SOP completo',
		'faq.eyebrow': 'FAQ',
		'faq.title': 'Preguntas Frecuentes',
		'faq.q1': '¿Qué industrias atienden?',
		'faq.a1': 'Granjas avícolas, almazaras, hoteles y residuos municipales.',
		'faq.q2': '¿Limpieza de emergencia?',
		'faq.a2': 'Sí, protocolos rápidos de contención y desinfección.',
		'faq.q3': '¿Cómo solicitar un presupuesto?',
		'faq.a3': 'Formulario de contacto o contact@zerotrace.tn — respuesta en 1 día.'
	},
	de: {
		'meta.title': 'Zero Trace — B2B Reinigung & Desinfektion',
		'meta.description': 'Zero Trace bietet B2B-Tiefenreinigung, Desinfektion, Geruchskontrolle und umweltbewusste Sanitärlösungen.',
		'insights.eyebrow': 'Einblicke',
		'insights.title': 'Leitfäden & Best Practices',
		'insights.intro': 'Praktische, prüfbare Methoden für Industrieumgebungen.',
		'insights.a1.title': 'ATP-Tests für Desinfektion: Schwellen & Reporting',
		'insights.a1.desc': 'Warum ATP zählt, unser Sampling und Zielbereiche.',
		'insights.a1.cta': 'Mit Experten sprechen',
		'insights.a2.title': 'Geruchskontrolle auf Deponien',
		'insights.a2.desc': 'Quellen, Neutralisation und messbare Kennzahlen.',
		'insights.a2.cta': 'Vollständiges SOP anfordern',
		'faq.eyebrow': 'FAQ',
		'faq.title': 'Häufige Fragen',
		'faq.q1': 'Welche Branchen bedienen Sie?',
		'faq.a1': 'Geflügelfarmen, Ölmühlen, Hotels und kommunale Abfallstandorte.',
		'faq.q2': 'Notfallreinigung?',
		'faq.a2': 'Ja, schnelle Eindämmung und Desinfektion.',
		'faq.q3': 'Angebot anfordern?',
		'faq.a3': 'Kontaktformular oder contact@zerotrace.tn — Antwort in 1 Werktag.'
	},
	ar: {
		'meta.title': 'زيرو تريس — تنظيف وتعقيم للأعمال',
		'meta.description': 'زيرو تريس تقدم تنظيفًا عميقًا للأعمال، تعقيمًا، مكافحة الروائح وحلولًا واعية للبيئة.',
		'insights.eyebrow': 'مقالات',
		'insights.title': 'أدلة وممارسات مُجرَّبة',
		'insights.intro': 'أساليب عملية وموثوقة نستخدمها في البيئات الصناعية.',
		'insights.a1.title': 'اختبار ATP للتعقيم: الحدود والتقارير',
		'insights.a1.desc': 'لماذا يهم ATP وكيف نأخذ العينات ونطاقات النجاح.',
		'insights.a1.cta': 'تحدث إلى خبير',
		'insights.a2.title': 'مكافحة الروائح في مواقع النفايات البلدية',
		'insights.a2.desc': 'تحديد المصدر، كيمياء التعادل، ومقاييس قابلة للقياس.',
		'insights.a2.cta': 'اطلب الإجراء الكامل',
		'faq.eyebrow': 'الأسئلة الشائعة',
		'faq.title': 'أسئلة متكررة',
		'faq.q1': 'ما هي القطاعات التي تخدمونها؟',
		'faq.a1': 'مزارع الدواجن، معاصر الزيتون، الفنادق ومواقع النفايات البلدية.',
		'faq.q2': 'تنظيف طارئ؟',
		'faq.a2': 'نعم، استجابة سريعة وإجراءات تعقيم.',
		'faq.q3': 'كيف نطلب عرض سعر؟',
		'faq.a3': 'نموذج الاتصال أو contact@zerotrace.tn — نرد خلال يوم عمل.'
	}
};

let currentLang = (function(){ try { return localStorage.getItem('site_lang') || 'en'; } catch(_) { return 'en'; } })();

function setDirection(lang){
	if (lang === 'ar') { document.documentElement.setAttribute('dir','rtl'); }
	else { document.documentElement.setAttribute('dir','ltr'); }
}

function syncLangBadge(lang){
	const item = document.querySelector(`#langMenu li[data-lang="${lang}"]`);
	if (!item) return;
	const flag = item.querySelector('img') ? item.querySelector('img').src : '';
	const code = item.textContent.trim().split(' ')[1] || lang.toUpperCase();
	const langFlag = document.getElementById('langFlag');
	const langCode = document.getElementById('langCode');
	if (langFlag) langFlag.src = flag;
	if (langCode) langCode.textContent = code;
}

function translateDataI18n(lang){
	const dict = i18n[lang] || i18n.en;
	document.querySelectorAll('[data-i18n]').forEach(el => {
		const key = el.getAttribute('data-i18n');
		if (dict && dict[key]) {
			el.textContent = dict[key];
		}
	});
}

function applyTranslations(lang) {
    const elements = {
        'nav.home': document.querySelector('#nav-menu a[href="/index.html"]'),
        'nav.poultry': document.querySelector('#nav-menu a[href="/poultry.html"]'),
        'nav.olive': document.querySelector('#nav-menu a[href="/olive.html"]'),
        'nav.export': document.querySelector('#nav-menu a[href="/export.html"]'),
        'nav.zerotrace': document.querySelector('#nav-menu a[href="/zerotrace.html"]'),
        'nav.contact': document.querySelector('#nav-menu a[href="/contact.html"]')
    };
    Object.keys(elements).forEach(key => { if (elements[key] && translations[lang] && translations[lang][key]) { elements[key].textContent = translations[lang][key]; } });

	translateDataI18n(lang);

    // Footer translation
    const footerMeta = document.querySelector('.footer .footer-meta span');
    if (footerMeta && translations[lang] && translations[lang]['footer.reserved']) {
        const yearEl = document.getElementById('year');
        const year = new Date().getFullYear();
        if (yearEl) yearEl.textContent = year;
        const brandEl = document.querySelector('.footer .logo-text');
        const brand = brandEl ? brandEl.textContent.replace(/\s+/g,' ').trim() : '';
        footerMeta.innerHTML = `© <span id=\"year\">${year}</span> ${brand}. ${translations[lang]['footer.reserved']}`;
    }

	setDirection(lang);
	syncLangBadge(lang);
}

document.addEventListener('DOMContentLoaded', function() {
    const langBtn = document.getElementById('langBtn');
    if (langBtn) {
        langBtn.addEventListener('click', function() {
            const langMenu = document.getElementById('langMenu');
            if (langMenu) { langMenu.classList.toggle('show'); }
        });
    }
    const langMenuItems = document.querySelectorAll('#langMenu li');
    langMenuItems.forEach(item => {
        item.addEventListener('click', function() {
            const lang = this.dataset.lang; currentLang = lang;
            try { localStorage.setItem('site_lang', lang); } catch(_) {}
            applyTranslations(lang);
            const langMenu = document.getElementById('langMenu'); if (langMenu) { langMenu.classList.remove('show'); }
        });
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', function() {
            const html = document.documentElement; const currentTheme = html.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            html.setAttribute('data-theme', newTheme); try { localStorage.setItem('theme', newTheme); } catch(_) {}
        });
    }
});

function initActiveNav() {
    const currentPath = window.location.pathname; const navLinks = document.querySelectorAll('.nav-menu a');
    navLinks.forEach(link => {
        link.classList.remove('active');
        const href = (link.getAttribute('href') || '').toLowerCase();
        const hrefNorm = href.startsWith('/') ? href : `/${href}`;
        if (hrefNorm === currentPath.toLowerCase() || (currentPath === '/' && hrefNorm === '/index.html')) { link.classList.add('active'); }
    });
}

document.addEventListener('DOMContentLoaded', function() {
    const savedTheme = (function(){ try { return localStorage.getItem('theme') || 'light'; } catch(_) { return 'light'; } })();
    document.documentElement.setAttribute('data-theme', savedTheme);
    applyTranslations(currentLang); initActiveNav();
    const backToTopBtn = document.getElementById('backToTop');
    if (backToTopBtn) {
        window.addEventListener('scroll', function() { backToTopBtn.style.display = window.pageYOffset > 300 ? 'block' : 'none'; });
        backToTopBtn.addEventListener('click', function() { window.scrollTo({ top: 0, behavior: 'smooth' }); });
    }
});
