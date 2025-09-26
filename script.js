// Production contact script (Zoho Desk submission)

document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    
	function logLine(msg){/* no-op in production */}
        
	if (contactForm) {
		const isZohoDesk = /^https?:\/\/desk\.zoho\.com\/support\/WebToCase/i.test(contactForm.getAttribute('action') || '');

		// Basic client-side validation helpers
		const nameInput = document.getElementById('name');
		const companyInput = document.getElementById('company');
		const emailInput = document.getElementById('email');
		const phoneInput = document.getElementById('phone');
		const messageInput = document.getElementById('message');

		function getDict(){ try { const lang = localStorage.getItem('site_lang') || 'en'; return i18n[lang] || i18n.en; } catch(_) { return i18n.en; } }

		// Rate limit helpers: one successful submission per hour
		function getLastSubmitTs(){ try { return parseInt(localStorage.getItem('contact_last_submit_ts') || '0', 10) || 0; } catch(_) { return 0; } }
		function setLastSubmitTs(){ try { localStorage.setItem('contact_last_submit_ts', String(Date.now())); } catch(_) {} }
		function isRateLimited(){ const now = Date.now(); return (now - getLastSubmitTs()) < 3600000; }

		function setError(inputEl, message){
			const field = inputEl && inputEl.closest('.form-field');
			if (!field) return;
			const errorEl = field.querySelector('.error');
			if (errorEl) { errorEl.textContent = message || ''; }
			if (message) { inputEl.setAttribute('aria-invalid', 'true'); }
			else { inputEl.removeAttribute('aria-invalid'); }
		}
		function validateRequired(inputEl){
			const dict = getDict();
			if (!inputEl || !String(inputEl.value || '').trim()) { setError(inputEl, dict['contact.error.required']); return false; }
			setError(inputEl, ''); return true;
		}
		function validateEmail(inputEl){
			const dict = getDict();
			if (!validateRequired(inputEl)) return false;
			const value = String(inputEl.value || '').trim();
			const ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
			if (!ok) { setError(inputEl, dict['contact.error.email']); return false; }
			setError(inputEl, ''); return true;
		}
		function validatePhone(inputEl){
			const dict = getDict();
			if (!validateRequired(inputEl)) return false;
			const value = String(inputEl.value || '').trim();
			const ok = /^[0-9+()\-\s]{7,}$/.test(value);
			if (!ok) { setError(inputEl, dict['contact.error.phone']); return false; }
			setError(inputEl, ''); return true;
		}
		function validateMessage(inputEl){
			const dict = getDict();
			if (!validateRequired(inputEl)) return false;
			if (String(inputEl.value || '').trim().length < 10) { setError(inputEl, dict['contact.error.min']); return false; }
			setError(inputEl, ''); return true;
		}
		function validateAll(){
			const results = [
				validateRequired(nameInput),
				validateRequired(companyInput),
				validateEmail(emailInput),
				validatePhone(phoneInput),
				validateMessage(messageInput)
			];
			return results.every(Boolean);
		}
		[nameInput, companyInput, emailInput, phoneInput, messageInput].forEach(function(el){
			if (!el) return;
			el.addEventListener('blur', function(){
				switch (el) {
					case emailInput: validateEmail(el); break;
					case phoneInput: validatePhone(el); break;
					case messageInput: validateMessage(el); break;
					default: validateRequired(el); break;
				}
			});
			el.addEventListener('input', function(){ setError(el, ''); });
		});

		if (isZohoDesk) {
			contactForm.addEventListener('submit', function(e) {
				// Rate limit check
				if (isRateLimited()) {
					e.preventDefault();
					const status = document.getElementById('formStatus');
					if (status) {
						const dict = getDict();
						status.textContent = dict['contact.error.rate'];
						status.classList.remove('success');
						status.classList.add('error');
					}
					return;
				}

				// Block submit if invalid
				if (!validateAll()) {
					e.preventDefault();
					const status = document.getElementById('formStatus');
					if (status) {
						const dict = getDict();
						status.textContent = dict['contact.error.summary'];
						status.classList.remove('success');
						status.classList.add('error');
					}
					return;
				}

				logLine('Submitting to Zoho Desk...');
        const submitBtn = contactForm.querySelector('button[type="submit"]');
				if (submitBtn) {
        submitBtn.disabled = true;
					submitBtn.innerHTML = '<span class="icon-left">⏳</span>'+ (getDict()['contact.sending'] || 'Sending your request...');
				}
				let overlay = document.getElementById('formLoading');
				if (overlay) { overlay.style.display = 'flex'; }
			});

			// If the form targets a hidden iframe, use its load event to show success
			const hiddenTarget = document.getElementById('hiddenFormTarget');
			if (hiddenTarget) {
				hiddenTarget.addEventListener('load', function() {
					const status = document.getElementById('formStatus');
					let overlay = document.getElementById('formLoading');
					if (overlay) { overlay.style.display = 'none'; }
					if (status) {
						// Use translated success message
						try {
							const lang = (function(){ try { return localStorage.getItem('site_lang') || 'en'; } catch(_) { return 'en'; } })();
							const dict = i18n[lang] || i18n.en;
							status.textContent = dict['contact.success'] || i18n.en['contact.success'];
						} catch(_) {
							status.textContent = 'Thanks! Your request was sent successfully.';
						}
						status.classList.remove('error');
						status.classList.add('success');
					}

					// Record successful submission time for rate limit
					setLastSubmitTs();

					const submitBtn = contactForm.querySelector('button[type="submit"]');
					if (submitBtn) {
						submitBtn.disabled = false;
						submitBtn.innerHTML = '<span class="icon-left">✉️</span>'+ (getDict()['contact.button'] || 'Send');
					}
					try { contactForm.reset(); } catch(e) {}
				});
			}
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

// Example main translations (data-i18n) based on repo + contact/index keys
const i18n = {
	en: {
		'meta.title': 'Zero Trace — B2B Cleaning & Sanitization',
		'meta.description': 'Zero Trace provides professional B2B deep cleaning, disinfection, odor control, and eco-conscious sanitization for industrial sectors.',
		'hero.headline.html': 'Zero Trace — <span class="accent">Leave No Trace</span> After Our Work Is Done.',
		'hero.subhead': 'B2B deep cleaning and sanitization for industrial environments. We deliver compliance-ready, eco-conscious results that look, feel, and test cleaner.',
		'hero.cta.primary': 'Contact Us',
		'hero.cta.secondary': 'Explore Services',
		'contact.title.html': 'Contact <span class="accent">Us</span>',
		'contact.lead': "Tell us about your facility and requirements. We’ll respond within one business day.",
		'contact.label.name': 'Name',
		'contact.label.company': 'Company',
		'contact.label.email': 'Email',
		'contact.label.phone': 'Phone',
		'contact.label.message': 'Message',
		'contact.placeholder.name': 'Jane Doe',
		'contact.placeholder.company': 'Your Company',
		'contact.placeholder.email': 'you@company.com',
		'contact.placeholder.phone': '+1 555 000 1234',
		'contact.placeholder.message': 'Tell us about your facility, timelines, and scope.',
		'contact.button': 'Send',
		'contact.success': 'Thanks! Your request was sent successfully.',
		'contact.sending': 'Sending your request...',
		'contact.error.required': 'This field is required.',
		'contact.error.email': 'Please enter a valid email address.',
		'contact.error.phone': 'Please enter a valid phone number.',
		'contact.error.min': 'Please enter at least 10 characters.',
		'contact.error.summary': 'Please fix the highlighted fields and try again.',
		'contact.error.rate': 'You can send only one request per hour. Please try again later.'
	},
	fr: {
		'meta.title': 'Zero Trace — Nettoyage & Désinfection B2B',
		'meta.description': 'Zero Trace fournit un nettoyage, une désinfection, un contrôle des odeurs et une sanitation écoresponsable pour les secteurs industriels.',
		'hero.headline.html': 'Zero Trace — <span class="accent">Aucune Trace</span> après notre passage.',
		'hero.subhead': 'Nettoyage et désinfection B2B pour environnements industriels. Des résultats conformes et écoresponsables.',
		'hero.cta.primary': 'Nous contacter',
		'hero.cta.secondary': 'Découvrir les services',
		'contact.title.html': 'Contactez <span class="accent">‑nous</span>',
		'contact.lead': 'Parlez‑nous de votre site et de vos besoins. Réponse sous un jour ouvré.',
		'contact.label.name': 'Nom',
		'contact.label.company': 'Société',
		'contact.label.email': 'Email',
		'contact.label.phone': 'Téléphone',
		'contact.label.message': 'Message',
		'contact.placeholder.name': 'Jean Dupont',
		'contact.placeholder.company': 'Votre société',
		'contact.placeholder.email': 'vous@societe.com',
		'contact.placeholder.phone': '+33 1 23 45 67 89',
		'contact.placeholder.message': 'Expliquez votre site, délais et périmètre.',
		'contact.button': 'Envoyer',
		'contact.success': 'Merci ! Votre demande a été envoyée avec succès.',
		'contact.sending': 'Envoi de votre demande...',
		'contact.error.required': 'Ce champ est obligatoire.',
		'contact.error.email': "Veuillez saisir une adresse e‑mail valide.",
		'contact.error.phone': 'Veuillez saisir un numéro de téléphone valide.',
		'contact.error.min': 'Veuillez saisir au moins 10 caractères.',
		'contact.error.summary': 'Corrigez les champs en surbrillance puis réessayez.',
		'contact.error.rate': 'Vous ne pouvez envoyer qu’une demande par heure. Réessayez plus tard.'
	},
	es: {
		'meta.title': 'Zero Trace — Limpieza y Desinfección B2B',
		'meta.description': 'Zero Trace ofrece limpieza profunda B2B, desinfección, control de olores y sanitización eco-responsable.',
		'hero.headline.html': 'Zero Trace — <span class="accent">Sin Rastro</span> tras nuestro trabajo.',
		'hero.subhead': 'Limpieza y desinfección B2B para entornos industriales con cumplimiento y sostenibilidad.',
		'hero.cta.primary': 'Contáctanos',
		'hero.cta.secondary': 'Explorar servicios',
		'contact.title.html': 'Contacta con <span class="accent">nosotros</span>',
		'contact.lead': 'Cuéntenos su instalación y requisitos. Respondemos en un día laborable.',
		'contact.label.name': 'Nombre',
		'contact.label.company': 'Empresa',
		'contact.label.email': 'Email',
		'contact.label.phone': 'Teléfono',
		'contact.label.message': 'Mensaje',
		'contact.placeholder.name': 'Juan Pérez',
		'contact.placeholder.company': 'Su empresa',
		'contact.placeholder.email': 'usted@empresa.com',
		'contact.placeholder.phone': '+34 600 000 000',
		'contact.placeholder.message': 'Cuéntenos su instalación, plazos y alcance.',
		'contact.button': 'Enviar',
		'contact.success': '¡Gracias! Su solicitud se envió correctamente.',
		'contact.sending': 'Enviando su solicitud...',
		'contact.error.required': 'Este campo es obligatorio.',
		'contact.error.email': 'Introduzca un correo electrónico válido.',
		'contact.error.phone': 'Introduzca un número de teléfono válido.',
		'contact.error.min': 'Introduzca al menos 10 caracteres.',
		'contact.error.summary': 'Corrija los campos resaltados e inténtelo de nuevo.',
		'contact.error.rate': 'Solo puede enviar una solicitud por hora. Inténtelo de nuevo más tarde.'
	},
	de: {
		'meta.title': 'Zero Trace — B2B Reinigung & Desinfektion',
		'meta.description': 'Zero Trace bietet B2B‑Tiefenreinigung, Desinfektion, Geruchskontrolle und umweltbewusste Sanitärlösungen.',
		'hero.headline.html': 'Zero Trace — <span class="accent">Keine Spuren</span> nach unserer Arbeit.',
		'hero.subhead': 'B2B‑Reinigung und Desinfektion für Industrieumgebungen. Konform und nachhaltig.',
		'hero.cta.primary': 'Kontakt',
		'hero.cta.secondary': 'Services ansehen',
		'contact.title.html': 'Kontaktieren <span class="accent">Sie uns</span>',
		'contact.lead': 'Beschreiben Sie Anlage und Bedarf. Antwort innerhalb eines Werktags.',
		'contact.label.name': 'Name',
		'contact.label.company': 'Firma',
		'contact.label.email': 'E‑Mail',
		'contact.label.phone': 'Telefon',
		'contact.label.message': 'Nachricht',
		'contact.placeholder.name': 'Max Mustermann',
		'contact.placeholder.company': 'Ihre Firma',
		'contact.placeholder.email': 'sie@firma.com',
		'contact.placeholder.phone': '+49 160 0000000',
		'contact.placeholder.message': 'Beschreiben Sie Anlage, Zeitplan und Umfang.',
		'contact.button': 'Senden',
		'contact.success': 'Danke! Ihre Anfrage wurde erfolgreich gesendet.',
		'contact.sending': 'Ihre Anfrage wird gesendet...',
		'contact.error.required': 'Dieses Feld ist erforderlich.',
		'contact.error.email': 'Bitte geben Sie eine gültige E‑Mail‑Adresse ein.',
		'contact.error.phone': 'Bitte geben Sie eine gültige Telefonnummer ein.',
		'contact.error.min': 'Bitte geben Sie mindestens 10 Zeichen ein.',
		'contact.error.summary': 'Bitte korrigieren Sie die markierten Felder und versuchen Sie es erneut.',
		'contact.error.rate': 'Sie können nur eine Anfrage pro Stunde senden. Bitte versuchen Sie es später erneut.'
	},
	ar: {
		'meta.title': 'زيرو تريس — تنظيف وتعقيم للأعمال',
		'meta.description': 'زيرو تريس تقدم تنظيفًا عميقًا للأعمال، تعقيمًا، مكافحة الروائح وحلولًا واعية للبيئة.',
		'hero.headline.html': 'زيرو تريس — <span class="accent">لا أثر</span> بعد عملنا.',
		'hero.subhead': 'تنظيف وتعقيم احترافي للبيئات الصناعية بنتائج متوافقة وصديقة للبيئة.',
		'hero.cta.primary': 'اتصل بنا',
		'hero.cta.secondary': 'استكشف الخدمات',
		'contact.title.html': 'تواصل <span class="accent">معنا</span>',
		'contact.lead': 'أخبرنا عن منشأتك ومتطلباتك. نرد خلال يوم عمل.',
		'contact.label.name': 'الاسم',
		'contact.label.company': 'الشركة',
		'contact.label.email': 'البريد الإلكتروني',
		'contact.label.phone': 'الهاتف',
		'contact.label.message': 'الرسالة',
		'contact.placeholder.name': 'فلان الفلاني',
		'contact.placeholder.company': 'اسم شركتك',
		'contact.placeholder.email': 'you@company.com',
		'contact.placeholder.phone': '+216 27 91 27 12',
		'contact.placeholder.message': 'أخبرنا عن منشأتك والجدول الزمني ونطاق العمل.',
		'contact.button': 'إرسال',
		'contact.success': 'شكرًا لك! تم إرسال طلبك بنجاح.',
		'contact.sending': 'جارٍ إرسال طلبك...',
		'contact.error.required': 'هذا الحقل مطلوب.',
		'contact.error.email': 'يرجى إدخال بريد إلكتروني صالح.',
		'contact.error.phone': 'يرجى إدخال رقم هاتف صالح.',
		'contact.error.min': 'يرجى إدخال 10 أحرف على الأقل.',
		'contact.error.summary': 'يرجى تصحيح الحقول المعلّمة ثم المحاولة مرة أخرى.',
		'contact.error.rate': 'يمكنك إرسال طلب واحد فقط كل ساعة. يرجى المحاولة لاحقًا.'
	}
};

// Extend EN with site sections
Object.assign(i18n.en, {
  'about.title.html':'About Zero <span class="accent">Trace</span>',
  'about.body':'We specialize in professional B2B cleaning and sanitation that meets rigorous industry standards. Our teams are trained for sensitive environments—from poultry farms to municipal waste sites—delivering measurable disinfection, residue removal, and odor control.',
  'about.li1':'Eco-friendly, science-backed methods',
  'about.li2':'Compliance-focused protocols and reporting',
  'about.li3':'Industrial-grade equipment and PPE',
  'about.li4':'Rapid deployment and scheduled maintenance',

  'services.title':'Core <span class="accent">Services</span>',
  'services.intro':'High-impact cleaning programs built for industrial reliability.',
  'services.c1.title':'Deep Sanitization & Disinfection',
  'services.c1.desc':'Hospital-grade disinfection and ATP-tested sanitation for high-risk zones.',
  'services.c2.title':'Industrial Degreasing & Residue Removal',
  'services.c2.desc':'Heavy-duty degreasers and foam cleaning for stubborn build-up and oils.',
  'services.c3.title':'Odor Control & Deodorization',
  'services.c3.desc':'Neutralization programs targeting bacterial and organic odor sources.',
  'services.c4.title':'Waste Removal & Remediation',
  'services.c4.desc':'Safe handling, sorting, and pre-treatment aligned with regulations.',
  'services.c5.title':'Emergency Outbreak Cleaning',
  'services.c5.desc':'Rapid containment and disinfection protocols for critical events.',

  'sectors.title':'Industries We <span class="accent">Serve</span>',
  'sectors.c1.title':'Poultry Farms',
  'sectors.c1.desc':'Biosecurity-first programs to control pathogens and cross-contamination.',
  'sectors.c2.title':'Olive-oil Presses',
  'sectors.c2.desc':'Residue and oil removal while protecting food-grade environments.',
  'sectors.c3.title':'Hotels',
  'sectors.c3.desc':'Back-of-house deep cleaning and front-of-house disinfection schedules.',
  'sectors.c4.title':'Municipal Waste Sites',
  'sectors.c4.desc':'Odor suppression and decontamination for high-load facilities.',

  'clients.title':'Our <span class="accent">Clients</span>',
  'clients.intro':'Trusted by operations leaders across agriculture, hospitality, and public works.',

  'why.title':'Why Choose <span class="accent">Us</span>',
  'why.b1':'No-trace cleaning — finish that looks pristine and tests even better.',
  'why.b2':'Compliance — aligned with local and industry regulations.',
  'why.b3':'Safety — strict PPE and hazard controls.',
  'why.b4':'Fast response — rapid mobilization when you need it.',
  'why.b5':'Eco-conscious — reduced water, responsible chemistry.',

  'guarantee.eyebrow':'Guarantee',
  'guarantee.title':'We leave no trace.',
  'guarantee.body':'Our name is our promise. From microbial loads to visible residue, we remove it—documented.',
  'guarantee.cta':'Contact Us',

  'insights.eyebrow':'Insights',
  'insights.title':'Guides & Best Practices',
  'insights.intro':'Practical, verifiable methods we use across industrial environments.',
  'insights.a1.title':'ATP Testing for Sanitization: Thresholds and Reporting',
  'insights.a1.desc':'Why ATP matters, how we sample, and the pass/fail ranges we target in high‑risk zones.',
  'insights.a1.cta':'Talk to an expert',
  'insights.a2.title':'Odor Control in Municipal Waste Sites: A Practical Playbook',
  'insights.a2.desc':'Source identification, neutralization chemistry, and measurable suppression metrics.',
  'insights.a2.cta':'Request the full SOP',

  'faq.eyebrow':'FAQ',
  'faq.title':'Common Questions',
  'faq.q1':'Which industries do you serve?',
  'faq.a1':'We support poultry farms, olive‑oil presses, hotels and municipal waste sites with compliance‑first cleaning.',
  'faq.q2':'Do you provide emergency cleaning?',
  'faq.a2':'Yes. We mobilize rapid containment and disinfection protocols for critical events.',
  'faq.q3':'How can we request a quote?',
  'faq.a3':'Use the contact form or email contact@misragroup.website with your site details. We reply within one business day.',
});

// Extend AR with site sections
Object.assign(i18n.ar, {
  'about.title.html':'نبذة عن <span class="accent">زيرو تريس</span>',
  'about.body':'نختصّ في تنظيف وتعقيم B2B وفق معايير صناعية صارمة. فرقنا مُدرّبة للبيئات الحسّاسة — من مزارع الدواجن إلى مواقع النفايات البلدية — مع نتائج قابلة للقياس في التعقيم وإزالة الرواسب ومكافحة الروائح.',
  'about.li1':'أساليب صديقة للبيئة مدعومة بالعلم',
  'about.li2':'بروتوكولات امتثال وتقارير',
  'about.li3':'معدات وتجهيزات صناعية',
  'about.li4':'استجابة سريعة وجدولة صيانة',

  'services.title':'الخدمات <span class="accent">الأساسية</span>',
  'services.intro':'برامج تنظيف عالية الأثر مبنية للموثوقية الصناعية.',
  'services.c1.title':'تعقيم وتطهير عميق',
  'services.c1.desc':'تعقيم بمستوى المستشفيات وقياسات ATP للمناطق عالية الخطورة.',
  'services.c2.title':'إزالة الشحوم والرواسب الصناعية',
  'services.c2.desc':'منظفات قوية ورغوة لإزالة التراكمات والدهون الصعبة.',
  'services.c3.title':'مكافحة الروائح وإزالة التعرّق',
  'services.c3.desc':'برامج تحييد تستهدف المصادر البكتيرية والعضوية.',
  'services.c4.title':'إزالة ومعالجة المخلفات',
  'services.c4.desc':'فرز ومعالجة تمهيدية متوافقة مع اللوائح.',
  'services.c5.title':'تنظيف الطوارئ للأوبئة',
  'services.c5.desc':'احتواء سريع وبروتوكولات تعقيم للأحداث الحرجة.',

  'sectors.title':'القطاعات <span class="accent">التي نخدمها</span>',
  'sectors.c1.title':'مزارع الدواجن',
  'sectors.c1.desc':'برامج أمان حيوي للحد من الممرضات ومنع انتقالها.',
  'sectors.c2.title':'معاصر الزيتون',
  'sectors.c2.desc':'إزالة الرواسب والزيوت مع حماية بيئات الغذاء.',
  'sectors.c3.title':'الفنادق',
  'sectors.c3.desc':'تنظيف خلفي وتعقيم أمامي وفق جداول.',
  'sectors.c4.title':'مواقع النفايات البلدية',
  'sectors.c4.desc':'كبح الروائح وإزالة التلوث للأحمال العالية.',

  'clients.title':'عملاؤنا',
  'clients.intro':'موثوق من قادة التشغيل في الزراعة والضيافة والأعمال العامة.',

  'why.title':'لماذا <span class="accent">نحن</span>',
  'why.b1':'تنظيف بلا أثر — مظهر مثالي ونتائج مُثبتة.',
  'why.b2':'امتثال — متوافق مع اللوائح.',
  'why.b3':'سلامة — تجهيزات وقاية صارمة.',
  'why.b4':'استجابة سريعة — تعبئة فورية.',
  'why.b5':'صديق للبيئة — ترشيد الماء وكيمياء مسؤولة.',

  'guarantee.eyebrow':'ضمان',
  'guarantee.title':'لا نترك أثراً.',
  'guarantee.body':'اسمنا وعدنا. من الأحمال الميكروبية إلى الرواسب المرئية، نزيلها — مع توثيق النتائج.',
  'guarantee.cta':'اتصل بنا',

  'insights.eyebrow':'رؤى',
  'insights.title':'أدلة وأفضل الممارسات',
  'insights.intro':'أساليب عملية وقابلة للتحقق نستخدمها عبر البيئات الصناعية.',
  'insights.a1.title':'اختبار ATP للتعقيم: الحدود والتقارير',
  'insights.a1.desc':'لماذا يهم ATP، كيف نأخذ العينات، ونطاقات النجاح/الفشل في المناطق عالية الخطورة.',
  'insights.a1.cta':'تحدث إلى خبير',
  'insights.a2.title':'مكافحة الروائح في مواقع النفايات البلدية: دليل عملي',
  'insights.a2.desc':'تحديد المصدر وكيمياء التحييد ومقاييس الكبح القابلة للقياس.',
  'insights.a2.cta':'اطلب إجراءات التشغيل القياسية الكاملة',

  'faq.eyebrow':'الأسئلة الشائعة',
  'faq.title':'أسئلة شائعة',
  'faq.q1':'ما القطاعات التي تخدمونها؟',
  'faq.a1':'ندعم مزارع الدواجن ومعاصر الزيتون والفنادق ومواقع النفايات البلدية بتنظيف يركز على الامتثال.',
  'faq.q2':'هل تقدمون تنظيف الطوارئ؟',
  'faq.a2':'نعم. نقوم بتعبئة احتواء سريع وبروتوكولات تعقيم للأحداث الحرجة.',
  'faq.q3':'كيف نطلب عرض سعر؟',
  'faq.a3':'استخدم نموذج الاتصال أو أرسل بريدًا إلى contact@misragroup.website مع تفاصيل موقعك. نرد خلال يوم عمل.'
});

Object.assign(i18n.en, {
  'hero.badge1':'Eco-conscious',
  'hero.badge2':'Compliance-first',
  'hero.badge3':'Fast Response'
});
Object.assign(i18n.fr, {
  'hero.badge1':'Éco‑responsable',
  'hero.badge2':'Priorité conformité',
  'hero.badge3':'Réponse rapide'
});
Object.assign(i18n.es, {
  'hero.badge1':'Eco‑consciente',
  'hero.badge2':'Enfoque en cumplimiento',
  'hero.badge3':'Respuesta rápida'
});
Object.assign(i18n.de, {
  'hero.badge1':'Umweltbewusst',
  'hero.badge2':'Compliance‑first',
  'hero.badge3':'Schnelle Reaktion'
});
Object.assign(i18n.ar, {
  'hero.badge1':'صديق للبيئة',
  'hero.badge2':'الأولوية للامتثال',
  'hero.badge3':'استجابة سريعة'
});

Object.assign(i18n.fr, {
  'about.title.html':'À propos de <span class="accent">Zero Trace</span>',
  'about.body':'Nous sommes spécialisés dans le nettoyage et la sanitation B2B conformes aux normes industrielles les plus exigeantes. Équipes formées pour les environnements sensibles — des élevages avicoles aux sites de déchets municipaux — avec des résultats mesurables en désinfection, élimination des résidus et contrôle des odeurs.',
  'about.li1':'Méthodes écoresponsables, fondées sur la science',
  'about.li2':'Protocoles de conformité et reporting',
  'about.li3':'Équipements et EPI de niveau industriel',
  'about.li4':'Déploiement rapide et maintenance planifiée',

  'services.title':'<span class="accent">Services</span> principaux',
  'services.intro':'Programmes de nettoyage à fort impact, pensés pour la fiabilité industrielle.',
  'services.c1.title':'Désinfection et sanitation approfondies',
  'services.c1.desc':'Désinfection de niveau hospitalier et sanitation vérifiée par ATP pour les zones à haut risque.',
  'services.c2.title':'Dégraissage industriel et élimination des résidus',
  'services.c2.desc':'Dégraissants puissants et nettoyage moussant pour dépôts et huiles tenaces.',
  'services.c3.title':'Contrôle et neutralisation des odeurs',
  'services.c3.desc':'Programmes de neutralisation ciblant les sources bactériennes et organiques.',
  'services.c4.title':'Évacuation et remédiation des déchets',
  'services.c4.desc':'Manutention sûre, tri et pré‑traitement conformes à la réglementation.',
  'services.c5.title':'Nettoyage d’urgence lors d’épidémies',
  'services.c5.desc':'Confinement rapide et protocoles de désinfection pour événements critiques.',

  'sectors.title':'Secteurs que nous <span class="accent">servons</span>',
  'sectors.c1.title':'Élevages avicoles',
  'sectors.c1.desc':'Programmes de biosécurité pour maîtriser les agents pathogènes et la contamination croisée.',
  'sectors.c2.title':'Moulins à huile d’olive',
  'sectors.c2.desc':'Élimination des résidus et huiles en préservant les environnements alimentaires.',
  'sectors.c3.title':'Hôtels',
  'sectors.c3.desc':'Nettoyage approfondi back‑office et planning de désinfection front‑office.',
  'sectors.c4.title':'Sites de déchets municipaux',
  'sectors.c4.desc':'Suppression des odeurs et décontamination pour sites à forte charge.',

  'clients.title':'Nos <span class="accent">clients</span>',
  'clients.intro':'Plébiscité par des responsables d’exploitation en agriculture, hôtellerie et services publics.',

  'why.title':'Pourquoi nous <span class="accent">choisir</span>',
  'why.b1':'Nettoyage sans trace — rendu impeccable et résultats vérifiés.',
  'why.b2':'Conformité — alignée sur les réglementations locales et sectorielles.',
  'why.b3':'Sécurité — EPI stricts et maîtrise des risques.',
  'why.b4':'Réactivité — mobilisation rapide quand vous en avez besoin.',
  'why.b5':'Écoresponsable — réduction de l’eau, chimie raisonnée.',

  'guarantee.eyebrow':'Garantie',
  'guarantee.title':'Nous ne laissons aucune trace.',
  'guarantee.body':'Notre nom est une promesse. Des charges microbiennes aux résidus visibles, nous éliminons — preuves à l’appui.',
  'guarantee.cta':'Nous contacter',

  'insights.eyebrow':'Insights',
  'insights.title':'Guides et bonnes pratiques',
  'insights.intro':'Méthodes pratiques et vérifiables utilisées dans les environnements industriels.',
  'insights.a1.title':'Test ATP pour la sanitation : seuils et rapports',
  'insights.a1.desc':'Pourquoi l’ATP compte, nos méthodes d’échantillonnage et les seuils visés en zones à risque.',
  'insights.a1.cta':'Parler à un expert',
  'insights.a2.title':'Contrôle des odeurs en déchetteries municipales : guide pratique',
  'insights.a2.desc':'Identification des sources, chimie de neutralisation et indicateurs mesurables.',
  'insights.a2.cta':'Demander la SOP complète',

  'faq.eyebrow':'FAQ',
  'faq.title':'Questions fréquentes',
  'faq.q1':'Quels secteurs servez‑vous ?',
  'faq.a1':'Nous accompagnons élevages avicoles, moulins à huile d’olive, hôtels et déchetteries municipales avec un nettoyage axé conformité.',
  'faq.q2':'Proposez‑vous des interventions d’urgence ?',
  'faq.a2':'Oui. Confinement rapide et protocoles de désinfection pour événements critiques.',
  'faq.q3':'Comment demander un devis ?',
  'faq.a3':'Utilisez le formulaire de contact ou écrivez à contact@misragroup.website avec les détails de votre site. Réponse sous un jour ouvré.'
});

Object.assign(i18n.es, {
  'about.title.html':'Acerca de <span class="accent">Zero Trace</span>',
  'about.body':'Nos especializamos en limpieza y sanitización B2B conforme a rigurosos estándares industriales. Equipos formados para entornos sensibles — desde granjas avícolas hasta sitios municipales de residuos — con resultados medibles en desinfección, eliminación de residuos y control de olores.',
  'about.li1':'Métodos ecológicos respaldados por la ciencia',
  'about.li2':'Protocolos de cumplimiento y reportes',
  'about.li3':'Equipos y EPP de grado industrial',
  'about.li4':'Despliegue rápido y mantenimiento programado',

  'services.title':'Servicios <span class="accent">clave</span>',
  'services.intro':'Programas de limpieza de alto impacto diseñados para la fiabilidad industrial.',
  'services.c1.title':'Desinfección y sanitización profunda',
  'services.c1.desc':'Desinfección de nivel hospitalario y sanitización validada por ATP para zonas de alto riesgo.',
  'services.c2.title':'Desengrase industrial y eliminación de residuos',
  'services.c2.desc':'Desengrasantes potentes y limpieza con espuma para depósitos e incrustaciones.',
  'services.c3.title':'Control y neutralización de olores',
  'services.c3.desc':'Programas de neutralización dirigidos a fuentes bacterianas y orgánicas.',
  'services.c4.title':'Retiro y remediación de residuos',
  'services.c4.desc':'Manipulación segura, clasificación y pretratamiento conforme a la normativa.',
  'services.c5.title':'Limpieza de emergencias por brotes',
  'services.c5.desc':'Contención rápida y protocolos de desinfección para eventos críticos.',

  'sectors.title':'Sectores que <span class="accent">atendemos</span>',
  'sectors.c1.title':'Granjas avícolas',
  'sectors.c1.desc':'Programas de bioseguridad para controlar patógenos y la contaminación cruzada.',
  'sectors.c2.title':'Almazaras de aceite de oliva',
  'sectors.c2.desc':'Eliminación de residuos y aceites protegiendo ambientes de grado alimentario.',
  'sectors.c3.title':'Hoteles',
  'sectors.c3.desc':'Limpieza profunda de áreas internas y desinfección programada de áreas públicas.',
  'sectors.c4.title':'Sitios de residuos municipales',
  'sectors.c4.desc':'Supresión de olores y descontaminación para instalaciones de alta carga.',

  'clients.title':'Nuestros <span class="accent">clientes</span>',
  'clients.intro':'De confianza para líderes de operaciones en agricultura, hostelería y servicios públicos.',

  'why.title':'Por qué <span class="accent">elegirnos</span>',
  'why.b1':'Limpieza sin rastro — acabado impecable y resultados verificados.',
  'why.b2':'Cumplimiento — alineado con normativas locales y del sector.',
  'why.b3':'Seguridad — EPP estricto y control de riesgos.',
  'why.b4':'Respuesta rápida — movilización inmediata cuando la necesite.',
  'why.b5':'Eco‑consciente — menos agua y química responsable.',

  'guarantee.eyebrow':'Garantía',
  'guarantee.title':'No dejamos rastro.',
  'guarantee.body':'Nuestro nombre es nuestra promesa. Desde cargas microbianas hasta residuos visibles, lo eliminamos — con evidencia.',
  'guarantee.cta':'Contáctanos',

  'insights.eyebrow':'Insights',
  'insights.title':'Guías y buenas prácticas',
  'insights.intro':'Métodos prácticos y verificables que usamos en entornos industriales.',
  'insights.a1.title':'Pruebas ATP para sanitización: umbrales e informes',
  'insights.a1.desc':'Por qué importa el ATP, cómo muestreamos y los rangos objetivo en zonas de alto riesgo.',
  'insights.a1.cta':'Hablar con un experto',
  'insights.a2.title':'Control de olores en sitios de residuos municipales: guía práctica',
  'insights.a2.desc':'Identificación de fuentes, química de neutralización y métricas medibles.',
  'insights.a2.cta':'Solicitar la SOP completa',

  'faq.eyebrow':'FAQ',
  'faq.title':'Preguntas frecuentes',
  'faq.q1':'¿Qué sectores atienden?',
  'faq.a1':'Apoyamos granjas avícolas, almazaras, hoteles y sitios de residuos municipales con limpieza orientada al cumplimiento.',
  'faq.q2':'¿Ofrecen limpieza de emergencia?',
  'faq.a2':'Sí. Movilizamos contención rápida y protocolos de desinfección para eventos críticos.',
  'faq.q3':'¿Cómo solicitamos un presupuesto?',
  'faq.a3':'Use el formulario de contacto o escriba a contact@misragroup.website con los detalles de su sitio. Respondemos en un día laborable.'
});

Object.assign(i18n.de, {
  'about.title.html':'Über <span class="accent">Zero Trace</span>',
  'about.body':'Wir sind spezialisiert auf B2B‑Reinigung und Sanitärlösungen nach strengen Industrie‑Standards. Teams geschult für sensible Umgebungen — von Geflügelfarmen bis zu kommunalen Abfallanlagen — mit messbaren Ergebnissen in Desinfektion, Rückstandsbeseitigung und Geruchskontrolle.',
  'about.li1':'Umweltfreundliche, wissenschaftlich fundierte Methoden',
  'about.li2':'Compliance‑orientierte Protokolle und Reporting',
  'about.li3':'Industrie‑Ausrüstung und PSA',
  'about.li4':'Schneller Einsatz und geplante Wartung',

  'services.title':'Zentrale <span class="accent">Leistungen</span>',
  'services.intro':'Reinigungsprogramme mit hoher Wirkung für industrielle Zuverlässigkeit.',
  'services.c1.title':'Tiefen‑Sanitär und Desinfektion',
  'services.c1.desc':'Desinfektion auf Krankenhaus‑Niveau und ATP‑geprüfte Sanitärwerte für Hochrisikobereiche.',
  'services.c2.title':'Industrielles Entfetten und Rückstandsentfernung',
  'services.c2.desc':'Leistungsstarke Entfetter und Schaumsäuberung für hartnäckige Ablagerungen und Öle.',
  'services.c3.title':'Geruchskontrolle und Desodorierung',
  'services.c3.desc':'Neutralisationsprogramme gegen bakterielle und organische Geruchsquellen.',
  'services.c4.title':'Abfallbeseitigung und Sanierung',
  'services.c4.desc':'Sichere Handhabung, Sortierung und Vorbehandlung gemäß Vorschriften.',
  'services.c5.title':'Notfall‑Reinigung bei Ausbrüchen',
  'services.c5.desc':'Schnelle Eindämmung und Desinfektionsprotokolle für kritische Ereignisse.',

  'sectors.title':'Branchen, die wir <span class="accent">bedienen</span>',
  'sectors.c1.title':'Geflügelfarmen',
  'sectors.c1.desc':'Biosicherheits‑Programme zur Kontrolle von Erregern und Kreuzkontamination.',
  'sectors.c2.title':'Olivenöl‑Pressen',
  'sectors.c2.desc':'Rückstands‑ und Ölentfernung bei Schutz von Lebensmittel‑Umgebungen.',
  'sectors.c3.title':'Hotels',
  'sectors.c3.desc':'Tiefenreinigung im Back‑of‑House und Desinfektionspläne im Front‑of‑House.',
  'sectors.c4.title':'Kommunale Abfallanlagen',
  'sectors.c4.desc':'Geruchsunterdrückung und Dekontamination für hochbelastete Anlagen.',

  'clients.title':'Unsere <span class="accent">Kunden</span>',
  'clients.intro':'Vertrauenspartner von Betriebsleitern in Landwirtschaft, Hotellerie und öffentlicher Hand.',

  'why.title':'Warum <span class="accent">wir</span>',
  'why.b1':'Reinigung ohne Spuren — optisch makellos, messbar beste Werte.',
  'why.b2':'Compliance — im Einklang mit lokalen und Branchen‑Vorgaben.',
  'why.b3':'Sicherheit — strikte PSA und Gefahrenkontrollen.',
  'why.b4':'Schnelle Reaktion — rasche Mobilisierung bei Bedarf.',
  'why.b5':'Umweltbewusst — weniger Wasser, verantwortungsvolle Chemie.',

  'guarantee.eyebrow':'Garantie',
  'guarantee.title':'Wir hinterlassen keine Spuren.',
  'guarantee.body':'Unser Name ist ein Versprechen. Von mikrobiellen Lasten bis zu sichtbaren Rückständen: Wir entfernen — dokumentiert.',
  'guarantee.cta':'Kontakt',

  'insights.eyebrow':'Insights',
  'insights.title':'Leitfäden & Best Practices',
  'insights.intro':'Praktische, verifizierbare Methoden aus Industrieumgebungen.',
  'insights.a1.title':'ATP‑Tests zur Sanitärkontrolle: Grenzwerte und Reporting',
  'insights.a1.desc':'Warum ATP wichtig ist, unsere Probenahme und Zielbereiche in Hochrisikozonen.',
  'insights.a1.cta':'Mit Experten sprechen',
  'insights.a2.title':'Geruchskontrolle in kommunalen Abfallanlagen: Praxisleitfaden',
  'insights.a2.desc':'Quellidentifikation, Neutralisationschemie und messbare Kennzahlen.',
  'insights.a2.cta':'Vollständige SOP anfordern',

  'faq.eyebrow':'FAQ',
  'faq.title':'Häufige Fragen',
  'faq.q1':'Welche Branchen bedienen Sie?',
  'faq.a1':'Wir unterstützen Geflügelfarmen, Olivenöl‑Pressen, Hotels und kommunale Abfallanlagen mit Compliance‑orientierter Reinigung.',
  'faq.q2':'Bieten Sie Notfallreinigung an?',
  'faq.a2':'Ja. Wir mobilisieren schnelle Eindämmung und Desinfektionsprotokolle für kritische Ereignisse.',
  'faq.q3':'Wie erhalten wir ein Angebot?',
  'faq.a3':'Nutzen Sie das Kontaktformular oder schreiben Sie an contact@misragroup.website mit Standortdetails. Antwort binnen eines Werktags.'
});

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
		if (!dict || !dict[key]) return;
		if (el.tagName === 'META' && el.getAttribute('name') === 'description') {
			el.setAttribute('content', dict[key]);
		} else {
			el.textContent = dict[key];
		}
	});
	// innerHTML translations
	document.querySelectorAll('[data-i18n-html]').forEach(el => {
		const key = el.getAttribute('data-i18n-html');
		if (dict && dict[key]) { el.innerHTML = dict[key]; }
	});
	// attribute translations (placeholder/value/aria-label)
	document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
		const key = el.getAttribute('data-i18n-placeholder');
		if (dict && dict[key]) { el.setAttribute('placeholder', dict[key]); }
	});
	document.querySelectorAll('[data-i18n-value]').forEach(el => {
		const key = el.getAttribute('data-i18n-value');
		if (dict && dict[key]) { el.setAttribute('value', dict[key]); }
	});
	document.querySelectorAll('[data-i18n-label]').forEach(el => {
		const key = el.getAttribute('data-i18n-label');
		if (dict && dict[key]) { el.setAttribute('aria-label', dict[key]); }
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
        footerMeta.innerHTML = `© <span id="year">${year}</span> ${brand}. ${translations[lang]['footer.reserved']}`;
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
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) backToTopBtn.classList.add('show');
            else backToTopBtn.classList.remove('show');
        });
        backToTopBtn.addEventListener('click', function() { window.scrollTo({ top: 0, behavior: 'smooth' }); });
    }

    // Reveal on scroll animations
    const revealEls = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right');
    const io = 'IntersectionObserver' in window ? new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                io.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5, rootMargin: '0px' }) : null;

    function ensureRevealTargets() {
        const selectors = [
            '#services .cards.services > *',
            '#sectors .cards.sectors > *',
            '#clients .cards.clients > *',
            '#why .benefits > *',
            '#why .highlight-card',
            '#insights .cards.services > *',
            '#faq .cards.services > *',
            '#contact .contact-form > *',
            '#contact .contact-info > *',
            '#contact .map-card',
            '#about .split-content > *',
            '.section-split .sector-media'
        ];
        selectors.forEach((selector) => {
            document.querySelectorAll(selector).forEach((el) => {
                const hasReveal = el.classList.contains('reveal-up') || el.classList.contains('reveal-left') || el.classList.contains('reveal-right') || el.classList.contains('revealed');
                if (!hasReveal) el.classList.add('reveal-up');
                if (io) io.observe(el);
            });
        });
    }

    function applyRevealStagger() {
        const groups = [
            '.cards.services', '.cards.sectors', '.cards.clients', '.benefits', '.contact-list',
            '#insights .cards.services', '#faq .cards.services', '#contact .contact-form', '#contact .contact-info', '#why .highlight-card', '#about .split-content'
        ];
        groups.forEach((selector) => {
            document.querySelectorAll(selector + ' > *').forEach((item, idx) => {
                item.style.setProperty('--reveal-delay', Math.min(idx * 50, 250) + 'ms');
            });
        });
    }

    ensureRevealTargets();
    applyRevealStagger();

    if (!('IntersectionObserver' in window)) {
        window.addEventListener('load', function(){
            setTimeout(function(){
                ensureRevealTargets();
                applyRevealStagger();
                document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right').forEach(function(el){ el.classList.add('revealed'); });
            }, 1200);
        });
    }
});

document.addEventListener('DOMContentLoaded', function() {
	const navToggleButton = document.querySelector('.nav-toggle');
	const navElement = document.querySelector('header.header .nav');
	const navMenu = document.getElementById('nav-menu');
	if (!navToggleButton || !navElement || !navMenu) return;

	function closeNav() {
		navElement.classList.remove('open');
		navToggleButton.setAttribute('aria-expanded', 'false');
	}

	navToggleButton.addEventListener('click', function(event) {
		event.stopPropagation();
		const isOpen = navElement.classList.toggle('open');
		navToggleButton.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
	});

	// Close when clicking outside
	document.addEventListener('click', function(event) {
		if (!navElement.classList.contains('open')) return;
		const isClickInside = navElement.contains(event.target);
		if (!isClickInside) closeNav();
	});

	// Close on Escape
	document.addEventListener('keydown', function(event) {
		if (event.key === 'Escape') closeNav();
	});

	// Close when a nav link or any actionable item is clicked
	navMenu.querySelectorAll('a').forEach(function(link) {
		link.addEventListener('click', function() { closeNav(); });
	});
	// Also close on clicks on buttons or list items inside the menu
	navMenu.addEventListener('click', function(e) {
		const actionable = e.target.closest('a, button, li');
		if (actionable) closeNav();
	});
});
