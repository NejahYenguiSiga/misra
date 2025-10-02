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
		'meta.description': 'Misra Group is a multi‑department industrial group. Zero Trace is our waste collection and environmental services arm.',
		'hero.headline.html': 'Misra Group — <span class="accent">One Group</span>, Many Expert Departments.',
		'hero.subhead': 'A unified group covering cleaning & sanitization, poultry, olive‑oil processing, exports and more—compliance‑first, measurable results, fast response.',
		'hero.cta.primary': 'Contact Us',
		'hero.cta.secondary': 'Explore Services',
		'contact.title.html': 'Contact <span class="accent">Us</span>',
		'contact.lead': "Tell us about your facility and requirements. We'll respond within one business day.",
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
		'meta.description': 'Zero Trace propose du nettoyage en profondeur, désinfection, contrôle des odeurs et solutions écoresponsables pour secteurs industriels.',
		'hero.headline.html': 'Misra Group — Un <span class="accent">Groupe</span>, plusieurs départements experts.',
		'hero.subhead': 'Un groupe unifié couvrant le nettoyage & la désinfection, l\'avicole, l\'oléicole, l\'export… avec conformité mesurable et réponse rapide.',
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
					'contact.error.rate': 'Vous ne pouvez envoyer qu\'une demande par heure. Réessayez plus tard.',

		// Home – Misra Group services (group-level)
		'services.title': 'Services du <span class="accent">Groupe</span>',
		'services.intro': 'Prestations clés fournies à travers les départements de Misra Group.',
		'services.c1.title': 'Services environnementaux & collecte des déchets',
		'services.c1.desc': 'Programmes de collecte, tri et amélioration environnementale pour nos sites et des partenaires externes.',
		'services.c2.title': 'Opérations avicoles',
		'services.c2.desc': 'Soutien aux fermes et sites de transformation avec protocoles de biosécurité.',
		'services.c3.title': 'Opérations oléicoles',
		'services.c3.desc': 'Hygiène et soutien opérationnel pour les huileries et lignes d\'extraction.',
		'services.c4.title': 'Logistique & export',
		'services.c4.desc': 'Chaînes logistiques, conformité douanière et délais fiables vers nos marchés.',
		'services.c5.title': 'Qualité & conformité du groupe',
		'services.c5.desc': 'Audits, reporting et amélioration continue à l\'échelle du groupe.',

		'departments.title':'Nos <span class="accent">Départements</span>',
		'departments.intro':'Découvrez les divisions du Groupe Misra au service de l\'industrie de bout en bout.',
		'departments.c1.title':'Collecte des déchets & services environnementaux',
		  'departments.c1.desc':'Collecte, tri et programmes environnementaux pour Misra et des entreprises externes.',
  'departments.c1.cta':'En savoir plus',
		'departments.c2.title':'Avicole',
		'departments.c2.desc':'Programmes guidés par la biosécurité pour fermes et sites de transformation.',
		'departments.c2.cta':'En savoir plus',
		'departments.c3.title':'Oléicole',
		'departments.c3.desc':'Gestion des résidus et hygiène des huileries.',
		'departments.c3.cta':'En savoir plus',
		'departments.c4.title':'Export',
		'departments.c4.desc':'Logistique et export avec délais fiables.',
		'departments.c4.cta':'En savoir plus'
	},
	es: {
		'meta.title': 'Misra Group — Servicios Industriales y Departamentos',
		'meta.description': 'Misra Group es un grupo multi‑departamentos que ofrece servicios conformes y sostenibles: limpieza y desinfección, avícola, olivar, exportación y más.',
		'hero.headline.html': 'Misra Group — Un <span class="accent">Grupo</span>, muchos departamentos expertos.',
		'hero.subhead': 'Un grupo unificado que cubre limpieza y desinfección, avícola, olivar y exportación — cumplimiento medible y respuesta rápida.',
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
		'contact.error.rate': 'Solo puede enviar una solicitud por hora. Inténtelo de nuevo más tarde.',

		// Home – Misra Group services
		'services.title':'Servicios del <span class="accent">Grupo</span>',
		'services.intro':'Capacidades clave ofrecidas a través de los departamentos de Misra Group.',
		'services.c1.title':'Servicios ambientales y recolección de residuos',
		'services.c1.desc':'Programas de recolección, clasificación y mejora ambiental para nuestras sedes y socios externos.',
		'services.c2.title':'Operaciones avícolas',
		'services.c2.desc':'Apoyo a granjas y plantas de proceso con protocolos de bioseguridad.',
		'services.c3.title':'Operaciones de aceite de oliva',
		'services.c3.desc':'Higiene y apoyo operativo para almazaras y líneas de extracción.',
		'services.c4.title':'Logística y exportación',
		'services.c4.desc':'Cadenas logísticas, cumplimiento aduanero y plazos fiables a nuestros mercados.',
		'services.c5.title':'Calidad y cumplimiento del grupo',
		'services.c5.desc':'Auditorías, informes y mejora continua a nivel de grupo.',

		'departments.title':'Nuestros <span class="accent">Departamentos</span>',
		'departments.intro':'Descubre las divisiones de Misra Group que atienden la industria de extremo a extremo.',
		'departments.c1.title':'Recolección de residuos y servicios ambientales',
		  'departments.c1.desc':'Recolección, clasificación y programas ambientales para Misra y empresas externas.',
  'departments.c1.cta':'Más información',
		'departments.c2.title':'Avícola',
		'departments.c2.desc':'Programas guiados por la bioseguridad para granjas y entornos de proceso.',
		'departments.c2.cta':'Más información',
		'departments.c3.title':'Oliva',
		'departments.c3.desc':'Gestión de residuos y operaciones higiénicas para almazaras.',
		'departments.c3.cta':'Más información',
		'departments.c4.title':'Exportación',
		'departments.c4.desc':'Servicios logísticos y de exportación con plazos fiables.',
		'departments.c4.cta':'Más información'
	},
	de: {
		'meta.title': 'Misra Group — Industrielle Services & Bereiche',
		'meta.description': 'Misra Group ist ein mehrteiliger Konzern mit konformen, nachhaltigen Services: Reinigung & Desinfektion, Geflügel, Olivenöl, Export u. a.',
		'hero.headline.html': 'Misra Group — Eine <span class="accent">Gruppe</span>, viele Experten‑Bereiche.',
		'hero.subhead': 'Eine einheitliche Gruppe für Reinigung & Desinfektion, Geflügel, Olivenöl und Export — messbare Compliance und schnelle Reaktion.',
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
		'contact.error.rate': 'Sie können nur eine Anfrage pro Stunde senden. Bitte versuchen Sie es später erneut.',

		// Home – Misra Group services
		'services.title':'Konzern‑<span class="accent">Services</span>',
		'services.intro':'Zentrale Leistungen über die Bereiche der Misra Group hinweg.',
		'services.c1.title':'Umweltservices & Abfallsammlung',
		'services.c1.desc':'Programme zur Sammlung, Sortierung und Umweltverbesserung für unsere Standorte und externe Partner.',
		'services.c2.title':'Geflügel‑Operationen',
		'services.c2.desc':'Unterstützung für Betriebe und Verarbeitung mit Biosicherheits‑Protokollen.',
		'services.c3.title':'Olivenöl‑Operationen',
		'services.c3.desc':'Hygiene und operative Unterstützung für Pressen und Extraktionslinien.',
		'services.c4.title':'Logistik & Export',
		'services.c4.desc':'Logistikketten, Zoll‑Compliance und verlässliche Laufzeiten in unsere Märkte.',
		'services.c5.title':'Qualität & Compliance im Konzern',
		'services.c5.desc':'Audits, Reporting und kontinuierliche Verbesserung auf Gruppenebene.',

		'departments.title':'Unsere <span class="accent">Bereiche</span>',
		'departments.intro':'Entdecken Sie die Divisionen der Misra Group für durchgängige Industrie‑Services.',
		'departments.c1.title':'Abfallsammlung & Umweltservices',
		'departments.c1.desc':'Sammlung, Sortierung und Umweltprogramme für Misra und externe Unternehmen.',
		'departments.c1.cta':'Mehr erfahren',
		'departments.c2.title':'Geflügel',
		'departments.c2.desc':'Biosicherheits‑Programme für Betriebe und Verarbeitung.',
		'departments.c2.cta':'Mehr erfahren',
		'departments.c3.title':'Olivenöl',
		'departments.c3.desc':'Rückstandsmanagement und Hygiene für Olivenölpressen.',
		'departments.c3.cta':'Mehr erfahren',
		'departments.c4.title':'Export',
		'departments.c4.desc':'Logistik‑ und Exportservices mit verlässlichen Zeitplänen.',
		'departments.c4.cta':'Mehr erfahren'
	},
	ar: {
		'meta.title': 'مجموعة ميسرا — خدمات صناعية وأقسام',
		'meta.description': 'مجموعة ميسرا كيان متعدد الأقسام يقدم خدمات متوافقة وصديقة للبيئة: التنظيف والتعقيم، الدواجن، الزيتون، التصدير وغير ذلك.',
		'hero.headline.html': 'مجموعة ميسرا — <span class="accent">مجموعة واحدة</span>، أقسام خبيرة متعددة.',
		'hero.subhead': 'مجموعة موحدة تغطي التنظيف والتعقيم، الدواجن، الزيتون والتصدير — امتثال قابل للقياس واستجابة سريعة.',
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
  'about.title.html':'About <span class="accent">Misra Group</span>',
  'about.body':'Misra Group is a multi‑department industrial group with farms and olive‑oil presses, plus an export department. Zero Trace is our waste collection and environmental services company—created to serve Misra Group operations and now serving external companies as well.',
  'about.li1':'Eco‑friendly, science‑backed methods',
  'about.li2':'Compliance‑focused protocols and reporting',
  'about.li3':'Industrial‑grade equipment and PPE',
  'about.li4':'Rapid deployment and scheduled maintenance',

  // Home-scoped services for Misra Group
  'home.services.title':'Group <span class="accent">Services</span>',
  'home.services.intro':'Group‑wide capabilities delivered across Misra departments.',
  'home.services.c1.title':'Environmental Services & Waste Collection',
  'home.services.c1.desc':'Programs for collection, sorting and environmental improvement for our sites and external partners.',
  'home.services.c2.title':'Poultry Operations',
  'home.services.c2.desc':'Support for farms and processing sites with biosecurity protocols.',
  'home.services.c3.title':'Olive‑oil Operations',
  'home.services.c3.desc':'Hygiene and operational support for olive‑oil presses and extraction lines.',
  'home.services.c4.title':'Logistics & Export',
  'home.services.c4.desc':'Logistics chains, customs compliance and reliable timelines to our markets.',
  'home.services.c5.title':'Group Quality & Compliance',
  'home.services.c5.desc':'Audits, reporting and continuous improvement across the group.',

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

  'departments.title':'Our <span class="accent">Departments</span>',
  'departments.intro':'Explore Misra Group\'s divisions serving industry end‑to‑end.',
  'departments.c1.title':'Waste Collection & Environmental Services',
  'departments.c1.desc':'Collection, sorting and environmental programs for Misra sites and external companies.',
  'departments.c1.cta':'Learn more',
  'departments.c2.title':'Poultry',
  'departments.c2.desc':'Biosecurity‑led programs for farms and processing environments.',
  'departments.c2.cta':'Learn more',
  'departments.c3.title':'Olive‑oil',
  'departments.c3.desc':'Residue management and hygienic operations for olive‑oil presses.',
  'departments.c3.cta':'Learn more',
  'departments.c4.title':'Export',
  'departments.c4.desc':'Logistics and export services with reliable timelines.',
  'departments.c4.cta':'Learn more',

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

  'poultry.hero.title':'Poultry — Biosecurity‑led Operations',
  'poultry.hero.sub':'Programs and SOPs for farms and processing sites.',
  'olive.hero.title':'Olive‑oil — Press Operations',
  'olive.hero.sub':'Hygiene and residue management for olive‑oil presses.',
  'export.hero.title':'Export — Logistics & Compliance',
  'export.hero.sub':'Reliable timelines, customs readiness and documentation.',
  'contact.hero.title':'Contact Misra Group',
  'contact.hero.sub':'We reply within one business day.'
});

// Extend AR with site sections
Object.assign(i18n.ar, {
  'about.title.html':'نبذة عن <span class="accent">مجموعة ميسرا</span>',
  'about.body':'مجموعة ميسرا كيان صناعي متعدد الأقسام يضم مزارع ومعاصر زيتون وقسم تصدير. زيرو تريس هي شركة جمع نفايات وخدمات بيئية تابعة للمجموعة — أُنشئت لخدمة أقسام ميسرا والآن تخدم شركات خارجية أيضًا.',
  'about.li1':'أساليب صديقة للبيئة مدعومة بالعلم',
  'about.li2':'بروتوكولات امتثال وتقارير',
  'about.li3':'معدات وتجهيزات صناعية',
  'about.li4':'استجابة سريعة وجدولة صيانة',

  // Departments
  'departments.title':'أقسام <span class="accent">المجموعة</span>',
  'departments.intro':'استكشف أقسام مجموعة ميسرا التي تخدم الصناعة من البداية للنهاية.',
  'departments.c1.title':'جمع النفايات والخدمات البيئية',
  'departments.c1.desc':'جمع وفرز وبرامج بيئية لمواقع مجموعة ميسرا وشركات خارجية.',
  'departments.c1.cta':'اعرف المزيد',
  'departments.c2.title':'الدواجن',
  'departments.c2.desc':'برامج تعتمد السلامة الحيوية للمزارع وبيئات المعالجة.',
  'departments.c2.cta':'اعرف المزيد',
  'departments.c3.title':'الزيتون',
  'departments.c3.desc':'إدارة الرواسب وتشغيل صحي لمعاصر الزيتون.',
  'departments.c3.cta':'اعرف المزيد',
  'departments.c4.title':'التصدير',
  'departments.c4.desc':'خدمات لوجستية وتصدير بمواعيد موثوقة.',
  'departments.c4.cta':'اعرف المزيد',

  // Sectors
  'sectors.title':'القطاعات <span class="accent">التي نخدمها</span>',
  'sectors.c1.title':'مواقع النفايات البلدية',
  'sectors.c1.desc':'كبح الروائح وإزالة التلوث للمنشآت ذات الأحمال العالية.',
  'sectors.c2.title':'الفنادق',
  'sectors.c2.desc':'تنظيف مناطق الخدمات وتعقيم الواجهة وفق جداول.',
  'sectors.c3.title':'معاصر الزيتون',
  'sectors.c3.desc':'إزالة الرواسب والزيوت مع حماية بيئات الغذاء.',
  'sectors.c4.title':'مزارع الدواجن',
  'sectors.c4.desc':'برامج أمان حيوي للحد من الممرضات ومنع انتقالها.',

  // Clients
  'clients.title':'عملاؤنا',
  'clients.intro':'موثوق من قادة التشغيل في الزراعة والضيافة والأشغال العامة.',

  // Why choose us
  'why.title':'لماذا <span class="accent">نحن</span>',
  'why.b1':'تنظيف بلا أثر — مظهر مثالي ونتائج مُثبتة.',
  'why.b2':'امتثال — متوافق مع اللوائح المحلية والصناعية.',
  'why.b3':'سلامة — تجهيزات وقاية وإجراءات مخاطر صارمة.',
  'why.b4':'استجابة سريعة — تعبئة فورية عند الحاجة.',
  'why.b5':'صديق للبيئة — ترشيد الماء وكيمياء مسؤولة.',

  // Guarantee block
  'guarantee.eyebrow':'ضمان',
  'guarantee.title':'لا نترك أثراً.',
  'guarantee.body':'اسمنا وعدنا. من الأحمال الميكروبية إلى الرواسب المرئية، نزيلها — مع توثيق النتائج.',
  'guarantee.cta':'اتصل بنا',

  // Insights
  'insights.eyebrow':'رؤى',
  'insights.title':'أدلة وأفضل الممارسات',
  'insights.intro':'أساليب عملية قابلة للتحقق نستخدمها عبر البيئات الصناعية.',
  'insights.a1.title':'التحكم بالروائح في مواقع النفايات البلدية: دليل عملي',
  'insights.a1.desc':'تحديد المصدر وكيمياء التحييد ومقاييس الكبح القابلة للقياس.',
  'insights.a1.cta':'اطلب إجراءات التشغيل القياسية الكاملة',
  'insights.a2.title':'اختبار ATP للتعقيم: الحدود والتقارير',
  'insights.a2.desc':'لماذا يهم ATP وكيف نأخذ العينات ونطاقات النجاح/الفشل في المناطق عالية الخطورة.',
  'insights.a2.cta':'تحدث إلى خبير',

  // FAQ
  'faq.eyebrow':'الأسئلة الشائعة',
  'faq.title':'أسئلة شائعة',
  'faq.q1':'ما القطاعات التي تخدمونها؟',
  'faq.a1':'ندعم مزارع الدواجن ومعاصر الزيتون والفنادق ومواقع النفايات البلدية بتنظيف يركز على الامتثال.',
  'faq.q2':'هل تقدمون تنظيف الطوارئ؟',
  'faq.a2':'نعم، نقوم بتعبئة احتواء سريع وبروتوكولات تعقيم للأحداث الحرجة.',
  'faq.q3':'كيف نطلب عرض سعر؟',
  'faq.a3':'استخدم نموذج الاتصال أو أرسل بريدًا إلى contact@misragroup.website مع تفاصيل موقعك. نرد خلال يوم عمل.',

  // Home services
  'home.services.title':'خدمات <span class="accent">المجموعة</span>',
  'home.services.intro':'قدرات أساسية تُقدَّم عبر أقسام مجموعة ميسرا.',
  'home.services.c1.title':'الخدمات البيئية وجمع النفايات',
  'home.services.c1.desc':'برامج جمع وفرز وتحسين بيئي لمواقعنا وشركائنا.',
  'home.services.c2.title':'عمليات الدواجن',
  'home.services.c2.desc':'دعم المزارع ومواقع المعالجة ببروتوكولات الأمن الحيوي.',
  'home.services.c3.title':'عمليات الزيتون',
  'home.services.c3.desc':'نظافة ودعم تشغيلي لمعاصر الزيتون وخطوط الاستخلاص.',
  'home.services.c4.title':'اللوجستيات والتصدير',
  'home.services.c4.desc':'سلاسل لوجستية، امتثال جمركي ومواعيد موثوقة لأسواقنا.',
  'home.services.c5.title':'الجودة والامتثال على مستوى المجموعة',
  'home.services.c5.desc':'مراجعات وتقارير وتحسين مستمر على نطاق المجموعة.',

  // Restore generic services.* for other pages (Zero Trace defaults)
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
  'services.c5.desc':'احتواء سريع وبروتوكولات تعقيم للأحداث الحرجة.'
});

// Zero Trace page-specific translations
Object.assign(i18n.en, {
  'zerotrace.hero.headline.html':'Zero Trace — <span class="accent">Leave No Trace</span> After Our Work Is Done.',
  'zerotrace.hero.subhead':'B2B deep cleaning and sanitization for industrial environments. We deliver compliance‑ready, eco‑conscious results that look, feel, and test cleaner.',
  'zerotrace.about.title.html':'About Zero <span class="accent">Trace</span>',
  'zerotrace.about.body':'We specialize in professional B2B cleaning and sanitation for sensitive environments—from poultry farms to municipal waste sites—delivering measurable disinfection, residue removal, and odor control.',
  'zerotrace.about.li1':'Eco‑friendly, science‑backed methods',
  'zerotrace.about.li2':'Compliance‑focused protocols and reporting',
  'zerotrace.about.li3':'Industrial‑grade equipment and PPE',
  'zerotrace.about.li4':'Rapid deployment and scheduled maintenance'
});
Object.assign(i18n.fr, {
  'zerotrace.hero.headline.html':'Zero Trace — <span class="accent">Sans trace</span> après notre passage.',
  'zerotrace.hero.subhead':'Nettoyage et désinfection B2B pour environnements industriels, avec résultats conformes et écoresponsables.',
  'zerotrace.about.title.html':'À propos de Zero <span class="accent">Trace</span>',
  'zerotrace.about.body':'Spécialistes du nettoyage B2B pour environnements sensibles — des fermes avicoles aux sites de déchets municipaux — avec désinfection mesurable, dégraissage et contrôle des odeurs.',
  'zerotrace.about.li1':'Méthodes écoresponsables et scientifiques',
  'zerotrace.about.li2':'Protocoles de conformité et reporting',
  'zerotrace.about.li3':'Équipements industriels et EPI',
  'zerotrace.about.li4':'Déploiement rapide et maintenance planifiée'
});
Object.assign(i18n.es, {
  'zerotrace.hero.headline.html':'Zero Trace — <span class="accent">Sin rastro</span> tras nuestro trabajo.',
  'zerotrace.hero.subhead':'Limpieza y desinfección B2B para entornos industriales con resultados conformes y sostenibles.',
  'zerotrace.about.title.html':'Acerca de Zero <span class="accent">Trace</span>',
  'zerotrace.about.body':'Especialistas en limpieza B2B para entornos sensibles — de granjas avícolas a vertederos municipales — con desinfección medible, desengrase y control de olores.',
  'zerotrace.about.li1':'Métodos ecológicos y basados en ciencia',
  'zerotrace.about.li2':'Protocolos de cumplimiento y reportes',
  'zerotrace.about.li3':'Equipo de grado industrial y EPP',
  'zerotrace.about.li4':'Despliegue rápido y mantenimiento programado'
});
Object.assign(i18n.de, {
  'zerotrace.hero.headline.html':'Zero Trace — <span class="accent">Keine Spur</span> nach unserer Arbeit.',
  'zerotrace.hero.subhead':'B2B‑Reinigung und Desinfektion für Industrieumgebungen mit konformen, nachhaltigen Ergebnissen.',
  'zerotrace.about.title.html':'Über Zero <span class="accent">Trace</span>',
  'zerotrace.about.body':'Spezialisiert auf B2B‑Reinigung in sensiblen Umgebungen — von Geflügelbetrieben bis zu kommunalen Abfallstandorten — mit messbarer Desinfektion, Entfettung und Geruchskontrolle.',
  'zerotrace.about.li1':'Umweltfreundliche, wissenschaftlich fundierte Methoden',
  'zerotrace.about.li2':'Compliance‑Protokolle und Reporting',
  'zerotrace.about.li3':'Industrieausrüstung und PSA',
  'zerotrace.about.li4':'Schneller Einsatz und geplante Wartung'
});
Object.assign(i18n.ar, {
  'zerotrace.hero.headline.html':'زيرو تريس — <span class="accent">بلا أثر</span> بعد إنجاز العمل.',
  'zerotrace.hero.subhead':'تنظيف وتعقيم B2B للبيئات الصناعية مع نتائج متوافقة وصديقة للبيئة.',
  'zerotrace.about.title.html':'حول زيرو <span class="accent">تريس</span>',
  'zerotrace.about.body':'متخصصون في تنظيف B2B للبيئات الحساسة — من مزارع الدواجن إلى مواقع النفايات البلدية — مع تعقيم قابل للقياس، إزالة رواسب، والتحكم بالروائح.',
  'zerotrace.about.li1':'أساليب صديقة للبيئة مدعومة بالعلم',
  'zerotrace.about.li2':'بروتوكولات امتثال وتقارير',
  'zerotrace.about.li3':'معدات صناعية ووسائل وقاية',
  'zerotrace.about.li4':'انتشار سريع وصيانة مجدولة'
});

Object.assign(i18n.en, {
  'home.meta.title': 'Misra Group — Industrial Services & Departments',
  'home.meta.description': 'Misra Group is a multi‑department industrial group. Zero Trace is our waste collection and environmental services arm.',
  'home.hero.headline.html': 'Misra Group — <span class="accent">One Group</span>, Many Expert Departments.',
  'home.hero.subhead': 'A unified group covering cleaning & sanitization, poultry, olive‑oil processing, exports and more—compliance‑first, measurable results, fast response.',
  'home.hero.cta.primary': 'Explore Departments',
  'home.hero.cta.secondary': 'About Misra Group',
  'home.hero.badge1': 'Multi‑department',
  'home.hero.badge2': 'Compliance‑first',
  'home.hero.badge3': 'Fast Response'
});

Object.assign(i18n.fr, {
  'home.meta.title': 'Misra Group — Services industriels & Départements',
  'home.meta.description': 'Misra Group est un groupe multi‑départements. Zero Trace est notre pôle collecte des déchets et services environnementaux.',
  'home.hero.headline.html': 'Misra Group — <span class="accent">Un Groupe</span>, plusieurs départements experts.',
  'home.hero.subhead': 'Un groupe unifié couvrant nettoyage & désinfection, avicole, oléicole, export… conformité mesurable et réponse rapide.',
  'home.hero.cta.primary': 'Explorer les départements',
  'home.hero.cta.secondary': 'À propos de Misra Group',
  'home.hero.badge1': 'Multi‑départements',
  'home.hero.badge2': 'Conformité d\'abord',
  'home.hero.badge3': 'Réponse rapide'
});

Object.assign(i18n.es, {
  'home.meta.title': 'Misra Group — Servicios Industriales y Departamentos',
  'home.meta.description': 'Misra Group es un grupo industrial con varios departamentos. Zero Trace es nuestro brazo de recolección de residuos y servicios ambientales.',
  'home.hero.headline.html': 'Misra Group — <span class="accent">Un Grupo</span>, muchos departamentos expertos.',
  'home.hero.subhead': 'Grupo unificado que cubre limpieza y desinfección, avícola, almazaras y exportaciones — cumplimiento y respuesta rápida.',
  'home.hero.cta.primary': 'Explorar departamentos',
  'home.hero.cta.secondary': 'Sobre Misra Group',
  'home.hero.badge1': 'Multidepartamento',
  'home.hero.badge2': 'Cumplimiento primero',
  'home.hero.badge3': 'Respuesta rápida'
});

Object.assign(i18n.de, {
  'home.meta.title': 'Misra Group — Industrielle Services & Bereiche',
  'home.meta.description': 'Misra Group ist ein Konzern mit mehreren Bereichen. Zero Trace ist unser Bereich für Abfallsammlung und Umweltservices.',
  'home.hero.headline.html': 'Misra Group — <span class="accent">Ein Konzern</span>, viele Fachbereiche.',
  'home.hero.subhead': 'Einheitlicher Konzern für Reinigung & Desinfektion, Geflügel, Olivenöl‑Pressen und Export — Compliance und schnelle Reaktion.',
  'home.hero.cta.primary': 'Bereiche entdecken',
  'home.hero.cta.secondary': 'Über Misra Group',
  'home.hero.badge1': 'Mehrere Bereiche',
  'home.hero.badge2': 'Compliance‑first',
  'home.hero.badge3': 'Schnelle Reaktion'
});

Object.assign(i18n.ar, {
  'home.meta.title': 'مجموعة ميسرا — خدمات صناعية وأقسام',
  'home.meta.description': 'مجموعة ميسرا كيان متعدد الأقسام. زيرو تريس هو ذراعنا لجمع النفايات والخدمات البيئية.',
  'home.hero.headline.html': 'مجموعة ميسرا — <span class="accent">مجموعة واحدة</span>، أقسام خبيرة متعددة.',
  'home.hero.subhead': 'مجموعة موحدة تغطي التنظيف والتعقيم، الدواجن، معاصر الزيتون والتصدير — امتثال قابل للقياس واستجابة سريعة.',
  'home.hero.cta.primary': 'استكشف الأقسام',
  'home.hero.cta.secondary': 'عن مجموعة ميسرا',
  'home.hero.badge1': 'متعددة الأقسام',
  'home.hero.badge2': 'الامتثال أولًا',
  'home.hero.badge3': 'استجابة سريعة'
});

Object.assign(i18n.fr, {
  'sectors.title':'Secteurs que nous <span class="accent">servons</span>',
  'sectors.c1.title':'Fermes avicoles',
  'sectors.c1.desc':'Programmes de biosécurité pour contrôler les agents pathogènes et la contamination croisée.',
  'sectors.c2.title':'Huileries',
  'sectors.c2.desc':'Élimination des résidus et des huiles tout en protégeant les environnements alimentaires.',
  'sectors.c3.title':'Hôtels',
  'sectors.c3.desc':'Nettoyage des arrières‑cuisines et désinfection des zones clients.',
  'sectors.c4.title':'Sites de déchets municipaux',
  'sectors.c4.desc':'Suppression des odeurs et décontamination pour charges élevées.',
  'clients.title':'Nos <span class="accent">clients</span>',
  'clients.intro':'Plébiscité par des responsables d\'exploitation dans l\'agriculture, l\'hôtellerie et les services publics.',
  'why.title':'Pourquoi nous <span class="accent">choisir</span>',
  'why.b1':'Nettoyage sans trace — rendu impeccable et tests encore meilleurs.',
  'why.b2':'Conformité — alignée sur les réglementations locales et sectorielles.',
  'why.b3':'Sécurité — EPI stricts et contrôles des risques.',
  'why.b4':'Réactivité — mobilisation rapide quand vous en avez besoin.',
  'why.b5':'Écoresponsable — réduction d\'eau et chimie responsable.',
  'guarantee.eyebrow':'Garantie',
  'guarantee.title':'Nous ne laissons aucune trace.',
  'guarantee.body':'Notre nom est une promesse. Des charges microbiennes aux résidus visibles, nous supprimons — preuves à l\'appui.',
  'guarantee.cta':'Nous contacter',
  'insights.eyebrow':'Insights',
  'insights.title':'Guides & bonnes pratiques',
  'insights.intro':'Méthodes pratiques et vérifiables utilisées dans nos environnements industriels.',
  'insights.a1.title':'Test ATP pour la désinfection : seuils et reporting',
  'insights.a1.desc':'Pourquoi l\'ATP compte, comment nous échantillonnons et les plages réussite/échec visées.',
  'insights.a1.cta':'Parler à un expert',
  'insights.a2.title':'Contrôle des odeurs sur sites de déchets municipaux : guide pratique',
  'insights.a2.desc':'Identification des sources, chimie de neutralisation et mesures de réduction.',
  'insights.a2.cta':'Demander le SOP complet',
  'faq.eyebrow':'FAQ',
  'faq.title':'Questions fréquentes',
  'faq.q1':'Quels secteurs servez‑vous ?',
  'faq.a1':'Nous accompagnons fermes avicoles, huileries, hôtels et sites de déchets municipaux avec un nettoyage axé conformité.',
  'faq.q2':'Intervenez‑vous en urgence ?',
  'faq.a2':'Oui. Mobilisation rapide, confinement et protocoles de désinfection.',
  'faq.q3':'Comment demander un devis ?',
  'faq.a3':'Utilisez le formulaire de contact ou écrivez à contact@misragroup.website avec les détails du site. Réponse sous un jour ouvré.'
});

Object.assign(i18n.es, {
  'sectors.title':'Industrias que <span class="accent">atendemos</span>',
  'sectors.c1.title':'Granjas avícolas',
  'sectors.c1.desc':'Programas de bioseguridad para controlar patógenos y la contaminación cruzada.',
  'sectors.c2.title':'Almazaras',
  'sectors.c2.desc':'Retiro de residuos y aceites protegiendo ambientes de grado alimentario.',
  'sectors.c3.title':'Hoteles',
  'sectors.c3.desc':'Limpieza de back‑of‑house y desinfección de áreas públicas.',
  'sectors.c4.title':'Sitios de residuos municipales',
  'sectors.c4.desc':'Supresión de olores y descontaminación para altas cargas.',
  'clients.title':'Nuestros <span class="accent">clientes</span>',
  'clients.intro':'Confiado por líderes operativos en agricultura, hotelería y obras públicas.',
  'why.title':'Por qué elegir<span class="accent">nos</span>',
  'why.b1':'Limpieza sin rastro — acabado impecable y mejores tests.',
  'why.b2':'Cumplimiento — alineado con normativas locales e industriales.',
  'why.b3':'Seguridad — EPP estricto y controles de riesgo.',
  'why.b4':'Respuesta rápida — movilización cuando la necesitas.',
  'why.b5':'Ecológico — menos agua y química responsable.',
  'guarantee.eyebrow':'Garantía',
  'guarantee.title':'No dejamos rastro.',
  'guarantee.body':'Nuestro nombre es nuestra promesa. De cargas microbianas a residuos visibles, lo retiramos — con evidencia.',
  'guarantee.cta':'Contáctanos',
  'insights.eyebrow':'Insights',
  'insights.title':'Guías y mejores prácticas',
  'insights.intro':'Métodos prácticos y verificables que usamos en entornos industriales.',
  'insights.a1.title':'Pruebas ATP para sanitización: umbrales e informes',
  'insights.a1.desc':'Por qué importa ATP, cómo muestreamos y rangos de aprobado/reprobado en zonas críticas.',
  'insights.a1.cta':'Hablar con un experto',
  'insights.a2.title':'Control de olores en sitios de residuos municipales: guía práctica',
  'insights.a2.desc':'Identificación de fuentes, neutralización y métricas medibles.',
  'insights.a2.cta':'Solicitar el SOP completo',
  'faq.eyebrow':'FAQ',
  'faq.title':'Preguntas frecuentes',
  'faq.q1':'¿Qué industrias atienden?',
  'faq.a1':'Apoyamos granjas avícolas, almazaras, hoteles y sitios de residuos municipales con limpieza enfocada en cumplimiento.',
  'faq.q2':'¿Brindan limpieza de emergencia?',
  'faq.a2':'Sí. Movilizamos contención rápida y protocolos de desinfección.',
  'faq.q3':'¿Cómo solicitamos una cotización?',
  'faq.a3':'Usa el formulario de contacto o escribe a contact@misragroup.website con los datos del sitio. Respondemos en un día hábil.'
});

Object.assign(i18n.de, {
  'sectors.title':'Branchen, die wir <span class="accent">bedienen</span>',
  'sectors.c1.title':'Geflügelbetriebe',
  'sectors.c1.desc':'Biosicherheits‑Programme zur Kontrolle von Erregern und Kreuzkontamination.',
  'sectors.c2.title':'Olivenöl‑Pressen',
  'sectors.c2.desc':'Entfernung von Rückständen und Ölen bei Schutz von Lebensmittelbereichen.',
  'sectors.c3.title':'Hotels',
  'sectors.c3.desc':'Tiefenreinigung Back‑of‑House und Desinfektion Front‑of‑House.',
  'sectors.c4.title':'Kommunale Abfallstandorte',
  'sectors.c4.desc':'Geruchsminderung und Dekontamination für hohe Belastungen.',
  'clients.title':'Unsere <span class="accent">Kunden</span>',
  'clients.intro':'Vertraut von Betriebsleitern in Landwirtschaft, Hotellerie und öffentlicher Hand.',
  'why.title':'Warum <span class="accent">wir</span>',
  'why.b1':'Spurloses Reinigen — makelloses Ergebnis, noch bessere Tests.',
  'why.b2':'Compliance — im Einklang mit lokalen und Branchen‑Vorgaben.',
  'why.b3':'Sicherheit — strikte PSA und Gefahrenkontrollen.',
  'why.b4':'Schnelle Reaktion — rasche Mobilisierung bei Bedarf.',
  'why.b5':'Umweltbewusst — weniger Wasser, verantwortliche Chemie.',
  'guarantee.eyebrow':'Garantie',
  'guarantee.title':'Wir hinterlassen keine Spuren.',
  'guarantee.body':'Unser Name ist unser Versprechen. Von mikrobieller Last bis sichtbaren Rückständen – wir entfernen alles, belegt.',
  'guarantee.cta':'Kontakt',
  'insights.eyebrow':'Insights',
  'insights.title':'Leitfäden & Best Practices',
  'insights.intro':'Praktische, überprüfbare Methoden aus Industrieumgebungen.',
  'insights.a1.title':'ATP‑Tests für Sanitization: Schwellen und Reporting',
  'insights.a1.desc':'Warum ATP wichtig ist, wie wir Proben nehmen und Zielbereiche bestehen/nicht bestehen.',
  'insights.a1.cta':'Mit Experten sprechen',
  'insights.a2.title':'Geruchskontrolle an kommunalen Abfallstandorten: Praxisleitfaden',
  'insights.a2.desc':'Quellidentifikation, Neutralisations‑Chemie und messbare Dämpfung.',
  'insights.a2.cta':'Vollständiges SOP anfordern',
  'faq.eyebrow':'FAQ',
  'faq.title':'Häufige Fragen',
  'faq.q1':'Welche Branchen bedienen Sie?',
  'faq.a1':'Wir unterstützen Geflügelhöfe, Olivenöl‑Pressen, Hotels und kommunale Abfallstandorte mit Compliance‑orientierter Reinigung.',
  'faq.q2':'Bieten Sie Notfall‑Reinigung?',
  'faq.a2':'Ja. Schnelle Eindämmung und Desinfektions‑Protokolle.',
  'faq.q3':'Wie fordern wir ein Angebot an?',
  'faq.a3':'Nutzen Sie das Kontaktformular oder schreiben Sie an contact@misragroup.website mit Ihren Standort‑Details. Antwort innerhalb eines Werktags.'
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
	const scope = (document.documentElement && document.documentElement.getAttribute('data-scope')) || '';
	const resolve = (key) => {
		if (!dict) return undefined;
		if (scope && dict[`${scope}.${key}`]) return dict[`${scope}.${key}`];
		return dict[key];
	};
	document.querySelectorAll('[data-i18n]').forEach(el => {
		const key = el.getAttribute('data-i18n');
		const val = resolve(key);
		if (!val) return;
		if (el.tagName === 'META' && el.getAttribute('name') === 'description') {
			el.setAttribute('content', val);
		} else {
			el.textContent = val;
		}
	});
	// innerHTML translations
	document.querySelectorAll('[data-i18n-html]').forEach(el => {
		const key = el.getAttribute('data-i18n-html');
		const val = resolve(key);
		if (val) { el.innerHTML = val; }
	});
	// attribute translations (placeholder/value/aria-label)
	document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
		const key = el.getAttribute('data-i18n-placeholder');
		const val = resolve(key);
		if (val) { el.setAttribute('placeholder', val); }
	});
	document.querySelectorAll('[data-i18n-value]').forEach(el => {
		const key = el.getAttribute('data-i18n-value');
		const val = resolve(key);
		if (val) { el.setAttribute('value', val); }
	});
	document.querySelectorAll('[data-i18n-label]').forEach(el => {
		const key = el.getAttribute('data-i18n-label');
		const val = resolve(key);
		if (val) { el.setAttribute('aria-label', val); }
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
	const langMenu = document.getElementById('langMenu');
	if (langBtn) {
		langBtn.style.pointerEvents = 'auto';
		langBtn.addEventListener('click', function(e) {
			e.preventDefault();
			e.stopPropagation();
			if (langMenu) {
				const isOpen = langMenu.classList.toggle('show');
				langBtn.setAttribute('aria-expanded', String(isOpen));
				langMenu.setAttribute('aria-hidden', String(!isOpen));
				langMenu.style.pointerEvents = 'auto';
			}
		});
	}
	const langMenuItems = document.querySelectorAll('#langMenu li');
	langMenuItems.forEach(item => {
		item.style.pointerEvents = 'auto';
		item.addEventListener('click', function(e) {
			e.preventDefault();
			e.stopPropagation();
			const lang = this.dataset.lang; currentLang = lang;
			try { localStorage.setItem('site_lang', lang); } catch(_) {}
			applyTranslations(lang);
			if (langMenu) { langMenu.classList.remove('show'); langBtn && langBtn.setAttribute('aria-expanded', 'false'); langMenu.setAttribute('aria-hidden', 'true'); }
		});
	});

	// Close language menu on outside click
	document.addEventListener('click', function(e){
		if (!langMenu || !langBtn) return;
		if (!langMenu.classList.contains('show')) return;
		const clickedInside = e.target === langBtn || langBtn.contains(e.target) || langMenu.contains(e.target);
		if (!clickedInside) {
			langMenu.classList.remove('show');
			langBtn.setAttribute('aria-expanded', 'false');
			langMenu.setAttribute('aria-hidden', 'true');
		}
	});
});

document.addEventListener('DOMContentLoaded', function() {
	const themeToggle = document.getElementById('themeToggle');
	if (themeToggle) {
		themeToggle.style.pointerEvents = 'auto';
		themeToggle.addEventListener('click', function(e) {
			e.preventDefault();
			e.stopPropagation();
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
    }, { threshold: 0.2, rootMargin: '0px 0px -10% 0px' }) : null;

    // Observe any elements already marked with reveal-*
    if (io && revealEls && revealEls.length) {
        revealEls.forEach(el => io.observe(el));
    }

    function ensureRevealTargets() {
        const selectors = [
            '#departments .cards.departments > *',
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
            /* Exclude departments so CSS delays control them */
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

    // Ensure hero elements are visible immediately as a safeguard
    document.querySelectorAll('#home .reveal-up, #home .reveal-left, #home .reveal-right').forEach(function(el){
        el.classList.add('revealed');
    });

    // Removed: immediate reveal for departments so animation delays are visible
    // document.querySelectorAll('#departments .cards.departments > *').forEach(function(el){
    //     el.classList.add('revealed');
    // });

    // Safety: if Departments cards are already in view on load, reveal them
    setTimeout(function(){
        document.querySelectorAll('#departments .cards.departments > *').forEach(function(el){
            var rect = el.getBoundingClientRect();
            var inView = rect.top < (window.innerHeight * 0.9) && rect.bottom > 0;
            if (inView) el.classList.add('revealed');
        });
    }, 400);

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

// Global fallback click helpers for navbar controls
window.__toggleLang = function(e){ try{ e && e.preventDefault(); e && e.stopPropagation(); }catch(_){}
	var btn = document.getElementById('langBtn'); var menu = document.getElementById('langMenu');
	if (!menu) return false;
	var isOpen = menu.classList.toggle('show');
	if (btn) btn.setAttribute('aria-expanded', String(isOpen));
	menu.setAttribute('aria-hidden', String(!isOpen));
	return false;
};
window.__toggleTheme = function(e){ try{ e && e.preventDefault(); e && e.stopPropagation(); }catch(_){}
	var html = document.documentElement; var theme = html.getAttribute('data-theme');
	html.setAttribute('data-theme', theme === 'dark' ? 'light' : 'dark');
	try{ localStorage.setItem('theme', html.getAttribute('data-theme')); }catch(_){}
	return false;
};

// Mobile-safe language menu handlers (apply first, then close)
(function initMobileSafeLangHandlers(){
  function bindLangItem(li) {
    function applyAndClose(e) {
      if (e && e.cancelable) e.preventDefault();
      if (e) {
        try { e.stopPropagation(); } catch(_) {}
        try { if (typeof e.stopImmediatePropagation === 'function') e.stopImmediatePropagation(); } catch(_) {}
      }

      var lang = (li.getAttribute('data-lang') || 'en');
      var flag = (li.getAttribute('data-flag') || '');

      try { localStorage.setItem('site_lang', lang); } catch(_) {}
      try {
        document.documentElement.lang = lang;
        document.documentElement.dir  = (lang === 'ar') ? 'rtl' : 'ltr';
      } catch(_) {}

      try {
        var codeEl = document.getElementById('langCode'); if (codeEl) codeEl.textContent = lang.toUpperCase();
        var flagEl = document.getElementById('langFlag'); if (flagEl && flag) flagEl.src = flag;
      } catch(_) {}

      try {
        if (typeof applyTranslationsFor === 'function') applyTranslationsFor(lang);
        else if (typeof applyTranslations === 'function') applyTranslations(lang);
      } catch(_) {}

      setTimeout(function(){
        try {
          var langMenu = document.getElementById('langMenu');
          var langBtn  = document.getElementById('langBtn');
          if (langMenu) { langMenu.classList.remove('show'); langMenu.setAttribute('aria-hidden','true'); }
          if (langBtn)  { langBtn.setAttribute('aria-expanded','false'); try { langBtn.blur(); } catch(_) {} }
        } catch(_) {}
      }, 0);
    }

    // Fire first on touch/pointer (capture phase to beat outside-closers)
    try { li.addEventListener('pointerdown', applyAndClose, { capture: true, passive: false }); } catch(_) { li.addEventListener('pointerdown', applyAndClose, true); }
    try { li.addEventListener('touchstart',  applyAndClose, { capture: true, passive: false }); } catch(_) { li.addEventListener('touchstart', applyAndClose, true); }

    // Desktop/laptop fallback
    li.addEventListener('click', applyAndClose, { passive: false });

    // Optional: avoid double-fire on some browsers (mouse only)
    li.addEventListener('mousedown', function(e){
      try {
        if (e && e.pointerType && e.pointerType !== 'mouse') return;
        applyAndClose(e);
      } catch(_) {}
    }, { passive: false });
  }

  document.addEventListener('DOMContentLoaded', function(){
    var langMenu = document.getElementById('langMenu');
    if (!langMenu) return;
    var items = langMenu.querySelectorAll('li[data-lang]');
    if (!items || !items.length) return;
    items.forEach(function(li){ li.style.pointerEvents = 'auto'; bindLangItem(li); });

    // Ensure nav auto-close only triggers on real nav links, not language
    try {
      var nav = document.querySelector('.nav');
      var navToggle = document.querySelector('.nav-toggle');
      var navMenu = document.getElementById('nav-menu');
      if (nav && navToggle && navMenu) {
        navMenu.querySelectorAll('a').forEach(function(link){
          link.addEventListener('click', function(){
            try { nav.classList.remove('open'); navToggle.setAttribute('aria-expanded','false'); } catch(_) {}
          });
        });
      }
    } catch(_) {}
  });
})();

// CLEAN NEW NAVIGATION - LANGUAGE SWITCHER + THEME TOGGLE
(function() {
  console.log('🚀 Starting CLEAN navigation...');
  
  // Language switcher elements
  const cleanLangButton = document.getElementById('cleanLangButton');
  const cleanLangDropdown = document.getElementById('cleanLangDropdown');
  const cleanCurrentLang = document.getElementById('cleanCurrentLang');
  const currentLangFlag = document.getElementById('currentLangFlag');
  
  // Theme toggle elements
  const cleanThemeToggle = document.getElementById('cleanThemeToggle');
  
  // Navigation elements
  const newNavToggle = document.querySelector('.new-nav-toggle');
  const newNavMenu = document.getElementById('newNavMenu');
  const newNav = document.querySelector('.new-nav');
  
  if (!cleanLangButton || !cleanLangDropdown || !cleanCurrentLang || !currentLangFlag) {
    console.error('❌ Clean language switcher elements not found!');
    return;
  }
  
  if (!cleanThemeToggle) {
    console.error('❌ Clean theme toggle element not found!');
    return;
  }
  
  if (!newNavToggle || !newNavMenu || !newNav) {
    console.error('❌ Navigation menu elements not found!');
    return;
  }
  
  console.log('✅ Clean navigation elements found');
  
  const langs = ['EN', 'FR', 'ES', 'DE', 'AR'];
  let currentLang = 'EN';
  
  // Theme functionality
  function getTheme() {
    return localStorage.getItem('cleanTheme') || 'dark';
  }
  
  function setTheme(theme) {
    console.log('🎨 Setting theme to:', theme);
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('cleanTheme', theme);
    
    // Update theme icon
    const themeIcon = cleanThemeToggle.querySelector('.theme-icon');
    if (themeIcon) {
      themeIcon.textContent = theme === 'light' ? '🌙' : '🌓';
    }
    
    console.log('✅ Theme changed to:', theme);
  }
  
  function toggleTheme() {
    const currentTheme = getTheme();
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
  }
  
  // Navigation menu functionality
  function toggleNavMenu() {
    const isOpen = newNav.classList.contains('open');
    if (isOpen) {
      closeNavMenu();
    } else {
      openNavMenu();
    }
  }
  
  function openNavMenu() {
    newNav.classList.add('open');
    newNavToggle.setAttribute('aria-expanded', 'true');
    console.log('📱 Navigation menu opened');
  }
  
  function closeNavMenu() {
    newNav.classList.remove('open');
    newNavToggle.setAttribute('aria-expanded', 'false');
    console.log('📱 Navigation menu closed');
  }
  
  // Translation data for the clean switcher
  const cleanTranslations = {
    EN: {
      // Navigation
      'nav.home': 'Home',
      'nav.poultry': 'Poultry', 
      'nav.olive': 'Olive',
      'nav.export': 'Export',
      'nav.zerotrace': 'Zero Trace',
      'nav.contact': 'Contact',
      
      // Hero Section
      'hero.title': 'Misra Group — <span class="accent">One Group</span>, Many Expert Departments.',
      'hero.subtitle': 'A unified group covering cleaning & sanitization, poultry, olive‑oil processing, exports and more—compliance‑first, measurable results, fast response.',
      'hero.cta1': 'Explore Departments',
      'hero.cta2': 'About Misra Group',
      'hero.badge1': 'Multi‑department',
      'hero.badge2': 'Compliance‑first', 
      'hero.badge3': 'Fast Response',
      
      // Departments Section
      'departments.title': 'Our <span class="accent">Departments</span>',
      'departments.intro': 'Explore Misra Group\'s divisions serving industry end‑to‑end.',
      'departments.waste.title': 'Waste Collection & Environmental Services',
      'departments.waste.desc': 'Collection, sorting and environmental programs for Misra sites and external companies.',
      'departments.waste.cta': 'Learn more',
      'departments.poultry.title': 'Poultry',
      'departments.poultry.desc': 'Biosecurity‑led programs for farms and processing environments.',
      'departments.poultry.cta': 'Learn more',
      'departments.olive.title': 'Olive‑oil',
      'departments.olive.desc': 'Residue management and hygienic operations for olive‑oil presses.',
      'departments.olive.cta': 'Learn more',
      'departments.export.title': 'Export',
      'departments.export.desc': 'Logistics and export services with reliable timelines.',
      'departments.export.cta': 'Learn more',
      
      // About Section
      'about.title': 'About <span class="accent">Misra Group</span>',
      'about.desc': 'Misra Group is a multi‑department industrial group with farms and olive‑oil presses, plus an export department. Zero Trace is our waste collection and environmental services company—created to serve Misra Group operations and now serving external companies as well.',
      'about.point1': 'Eco-friendly, science-backed methods',
      'about.point2': 'Compliance-focused protocols and reporting',
      'about.point3': 'Industrial-grade equipment and PPE',
      'about.point4': 'Rapid deployment and scheduled maintenance',
      
      // Services Section
      'services.title': 'Group <span class="accent">Services</span>',
      'services.intro': 'Group-wide capabilities delivered across Misra departments.',
      'services.env.title': 'Environmental Services & Waste Collection',
      'services.env.desc': 'Programs for collection, sorting and environmental improvement for our sites and external partners.',
      'services.poultry.title': 'Poultry Operations',
      'services.poultry.desc': 'Support for farms and processing sites with biosecurity protocols.',
      'services.olive.title': 'Olive‑oil Operations',
      'services.olive.desc': 'Hygiene and operational support for olive‑oil presses and extraction lines.',
      'services.logistics.title': 'Logistics & Export',
      'services.logistics.desc': 'Logistics chains, customs compliance and reliable timelines to our markets.',
      'services.quality.title': 'Group Quality & Compliance',
      'services.quality.desc': 'Audits, reporting and continuous improvement across the group.',
      
      // Sectors Section
      'sectors.title': 'Industries We <span class="accent">Serve</span>',
      'sectors.poultry.title': 'Poultry Farms',
      'sectors.poultry.desc': 'Biosecurity-first programs to control pathogens and cross-contamination.',
      'sectors.olive.title': 'Olive-oil Presses',
      'sectors.olive.desc': 'Residue and oil removal while protecting food-grade environments.',
      'sectors.hotels.title': 'Hotels',
      'sectors.hotels.desc': 'Back-of-house deep cleaning and front-of-house disinfection schedules.',
      'sectors.municipal.title': 'Municipal Waste Sites',
      'sectors.municipal.desc': 'Odor suppression and decontamination for high-load facilities.',
      
      // Clients Section
      'clients.title': 'Our <span class="accent">Clients</span>',
      'clients.intro': 'Trusted by operations leaders across agriculture, hospitality, and public works.',
      
      // Why Section
      'why.title': 'Why Choose <span class="accent">Us</span>',
      'why.benefit1': '<strong>No-trace cleaning</strong> — finish that looks pristine and tests even better.',
      'why.benefit2': '<strong>Compliance</strong> — aligned with local and industry regulations.',
      'why.benefit3': '<strong>Safety</strong> — strict PPE and hazard controls.',
      'why.benefit4': '<strong>Fast response</strong> — rapid mobilization when you need it.',
      'why.benefit5': '<strong>Eco-conscious</strong> — reduced water, responsible chemistry.',
      'why.guarantee.eyebrow': 'Guarantee',
      'why.guarantee.title': 'We leave no trace.',
      'why.guarantee.desc': 'Our name is our promise. From microbial loads to visible residue, we remove it—documented.',
      'why.guarantee.cta': 'Contact Us',
      
      // Insights Section
      'insights.eyebrow': 'Insights',
      'insights.title': 'Guides & Best Practices',
      'insights.intro': 'Practical, verifiable methods we use across industrial environments.',
      'insights.atp.title': 'ATP Testing for Sanitization: Thresholds and Reporting',
      'insights.atp.desc': 'Why ATP matters, how we sample, and the pass/fail ranges we target in high‑risk zones.',
      'insights.atp.cta': 'Talk to an expert',
      'insights.odor.title': 'Odor Control in Municipal Waste Sites: A Practical Playbook',
      'insights.odor.desc': 'Source identification, neutralization chemistry, and measurable suppression metrics.',
      'insights.odor.cta': 'Request the full SOP',
      
      // FAQ Section
      'faq.eyebrow': 'FAQ',
      'faq.title': 'Common Questions',
      'faq.q1': 'Which industries do you serve?',
      'faq.a1': 'We support poultry farms, olive‑oil presses, hotels and municipal waste sites with compliance‑first cleaning.',
      'faq.q2': 'Do you provide emergency cleaning?',
      'faq.a2': 'Yes. We mobilize rapid containment and disinfection protocols for critical events.',
      'faq.q3': 'How can we request a quote?',
      'faq.a3': 'Use the contact form or email contact@misragroup.website with your site details. We reply within one business day.'
    },
    FR: {
      // Navigation
      'nav.home': 'Accueil',
      'nav.poultry': 'Volaille',
      'nav.olive': 'Olive',
      'nav.export': 'Export',
      'nav.zerotrace': 'Zero Trace',
      'nav.contact': 'Contact',
      
      // Hero Section
      'hero.title': 'Misra Group — <span class="accent">Un Groupe</span>, Plusieurs Départements Experts.',
      'hero.subtitle': 'Un groupe unifié couvrant le nettoyage et l\'assainissement, la volaille, le traitement de l\'huile d\'olive, les exportations et plus—conformité d\'abord, résultats mesurables, réponse rapide.',
      'hero.cta1': 'Explorer les Départements',
      'hero.cta2': 'À propos de Misra Group',
      'hero.badge1': 'Multi‑départements',
      'hero.badge2': 'Conformité d\'abord',
      'hero.badge3': 'Réponse Rapide',
      
      // Departments Section
      'departments.title': 'Nos <span class="accent">Départements</span>',
      'departments.intro': 'Explorez les divisions de Misra Group au service de l\'industrie de bout en bout.',
      'departments.waste.title': 'Collecte de Déchets & Services Environnementaux',
      'departments.waste.desc': 'Collecte, tri et programmes environnementaux pour les sites Misra et les entreprises externes.',
      'departments.waste.cta': 'En savoir plus',
      'departments.poultry.title': 'Volaille',
      'departments.poultry.desc': 'Programmes axés sur la biosécurité pour les fermes et environnements de transformation.',
      'departments.poultry.cta': 'En savoir plus',
      'departments.olive.title': 'Huile d\'olive',
      'departments.olive.desc': 'Gestion des résidus et opérations hygiéniques pour les presses à huile d\'olive.',
      'departments.olive.cta': 'En savoir plus',
      'departments.export.title': 'Export',
      'departments.export.desc': 'Services logistiques et d\'exportation avec des délais fiables.',
      'departments.export.cta': 'En savoir plus',
      
      // About Section
      'about.title': 'À propos de <span class="accent">Misra Group</span>',
      'about.desc': 'Misra Group est un groupe industriel multi‑départements avec des fermes et des presses à huile d\'olive, plus un département d\'exportation. Zero Trace est notre entreprise de collecte de déchets et de services environnementaux—créée pour servir les opérations de Misra Group et maintenant au service d\'entreprises externes également.',
      'about.point1': 'Méthodes écologiques et scientifiques',
      'about.point2': 'Protocoles et rapports axés sur la conformité',
      'about.point3': 'Équipement et EPI de qualité industrielle',
      'about.point4': 'Déploiement rapide et maintenance programmée',
      
      // Services Section
      'services.title': '<span class="accent">Services</span> du Groupe',
      'services.intro': 'Capacités à l\'échelle du groupe livrées dans tous les départements Misra.',
      'services.env.title': 'Services Environnementaux & Collecte de Déchets',
      'services.env.desc': 'Programmes de collecte, tri et amélioration environnementale pour nos sites et partenaires externes.',
      'services.poultry.title': 'Opérations Avicoles',
      'services.poultry.desc': 'Support pour fermes et sites de transformation avec protocoles de biosécurité.',
      'services.olive.title': 'Opérations Huile d\'Olive',
      'services.olive.desc': 'Support hygiénique et opérationnel pour presses à huile d\'olive et lignes d\'extraction.',
      'services.logistics.title': 'Logistique & Export',
      'services.logistics.desc': 'Chaînes logistiques, conformité douanière et délais fiables vers nos marchés.',
      'services.quality.title': 'Qualité & Conformité du Groupe',
      'services.quality.desc': 'Audits, rapports et amélioration continue dans tout le groupe.',
      
      // Sectors Section
      'sectors.title': 'Industries que nous <span class="accent">servons</span>',
      'sectors.poultry.title': 'Fermes Avicoles',
      'sectors.poultry.desc': 'Programmes axés sur la biosécurité pour contrôler les pathogènes et la contamination croisée.',
      'sectors.olive.title': 'Presses à Huile d\'Olive',
      'sectors.olive.desc': 'Élimination des résidus et de l\'huile tout en protégeant les environnements de qualité alimentaire.',
      'sectors.hotels.title': 'Hôtels',
      'sectors.hotels.desc': 'Nettoyage en profondeur en arrière-plan et programmes de désinfection en façade.',
      'sectors.municipal.title': 'Sites de Déchets Municipaux',
      'sectors.municipal.desc': 'Suppression des odeurs et décontamination pour installations à forte charge.',
      
      // Clients Section
      'clients.title': 'Nos <span class="accent">Clients</span>',
      'clients.intro': 'Fait confiance par les responsables opérationnels de l\'agriculture, l\'hôtellerie et les travaux publics.',
      
      // Why Section
      'why.title': 'Pourquoi nous <span class="accent">choisir</span>',
      'why.benefit1': '<strong>Nettoyage sans trace</strong> — finition qui paraît impeccable et teste encore mieux.',
      'why.benefit2': '<strong>Conformité</strong> — aligné avec les réglementations locales et industrielles.',
      'why.benefit3': '<strong>Sécurité</strong> — EPI strict et contrôles des dangers.',
      'why.benefit4': '<strong>Réponse rapide</strong> — mobilisation rapide quand vous en avez besoin.',
      'why.benefit5': '<strong>Éco-conscient</strong> — eau réduite, chimie responsable.',
      'why.guarantee.eyebrow': 'Garantie',
      'why.guarantee.title': 'Nous ne laissons aucune trace.',
      'why.guarantee.desc': 'Notre nom est notre promesse. Des charges microbiennes aux résidus visibles, nous l\'éliminons—documenté.',
      'why.guarantee.cta': 'Nous Contacter',
      
      // Insights Section
      'insights.eyebrow': 'Insights',
      'insights.title': 'Guides et Meilleures Pratiques',
      'insights.intro': 'Méthodes pratiques et vérifiables que nous utilisons dans les environnements industriels.',
      'insights.atp.title': 'Tests ATP pour l\'Assainissement : Seuils et Rapports',
      'insights.atp.desc': 'Pourquoi l\'ATP compte, comment nous échantillonnons, et les plages réussite/échec que nous ciblons dans les zones à haut risque.',
      'insights.atp.cta': 'Parler à un expert',
      'insights.odor.title': 'Contrôle des Odeurs dans les Sites de Déchets Municipaux : Un Guide Pratique',
      'insights.odor.desc': 'Identification des sources, chimie de neutralisation et métriques de suppression mesurables.',
      'insights.odor.cta': 'Demander le SOP complet',
      
      // FAQ Section
      'faq.eyebrow': 'FAQ',
      'faq.title': 'Questions Fréquentes',
      'faq.q1': 'Quelles industries servez-vous ?',
      'faq.a1': 'Nous soutenons les fermes avicoles, les presses à huile d\'olive, les hôtels et les sites de déchets municipaux avec un nettoyage axé sur la conformité.',
      'faq.q2': 'Fournissez-vous un nettoyage d\'urgence ?',
      'faq.a2': 'Oui. Nous mobilisons des protocoles de confinement rapide et de désinfection pour les événements critiques.',
      'faq.q3': 'Comment pouvons-nous demander un devis ?',
      'faq.a3': 'Utilisez le formulaire de contact ou envoyez un email à contact@misragroup.website avec les détails de votre site. Nous répondons dans un jour ouvrable.'
    },
    ES: {
      // Navigation
      'nav.home': 'Inicio',
      'nav.poultry': 'Avicultura',
      'nav.olive': 'Oliva',
      'nav.export': 'Exportar',
      'nav.zerotrace': 'Zero Trace',
      'nav.contact': 'Contacto',
      
      // Hero Section
      'hero.title': 'Misra Group — <span class="accent">Un Grupo</span>, Muchos Departamentos Expertos.',
      'hero.subtitle': 'Un grupo unificado que cubre limpieza y saneamiento, avicultura, procesamiento de aceite de oliva, exportaciones y más—cumplimiento primero, resultados medibles, respuesta rápida.',
      'hero.cta1': 'Explorar Departamentos',
      'hero.cta2': 'Acerca de Misra Group',
      'hero.badge1': 'Multi‑departamento',
      'hero.badge2': 'Cumplimiento primero',
      'hero.badge3': 'Respuesta Rápida',
      
      // Departments Section
      'departments.title': 'Nuestros <span class="accent">Departamentos</span>',
      'departments.intro': 'Explore las divisiones de Misra Group que sirven a la industria de extremo a extremo.',
      'departments.waste.title': 'Recolección de Residuos y Servicios Ambientales',
      'departments.waste.desc': 'Recolección, clasificación y programas ambientales para sitios de Misra y empresas externas.',
      'departments.waste.cta': 'Saber más',
      'departments.poultry.title': 'Avicultura',
      'departments.poultry.desc': 'Programas liderados por bioseguridad para granjas y entornos de procesamiento.',
      'departments.poultry.cta': 'Saber más',
      'departments.olive.title': 'Aceite de oliva',
      'departments.olive.desc': 'Gestión de residuos y operaciones higiénicas para prensas de aceite de oliva.',
      'departments.olive.cta': 'Saber más',
      'departments.export.title': 'Exportación',
      'departments.export.desc': 'Servicios logísticos y de exportación con cronogramas confiables.',
      'departments.export.cta': 'Saber más',
      
      // About Section
      'about.title': 'Acerca de <span class="accent">Misra Group</span>',
      'about.desc': 'Misra Group es un grupo industrial multi‑departamental con granjas y prensas de aceite de oliva, más un departamento de exportación. Zero Trace es nuestra empresa de recolección de residuos y servicios ambientales—creada para servir las operaciones de Misra Group y ahora sirviendo también a empresas externas.',
      'about.point1': 'Métodos ecológicos respaldados por la ciencia',
      'about.point2': 'Protocolos e informes centrados en el cumplimiento',
      'about.point3': 'Equipos y EPP de grado industrial',
      'about.point4': 'Despliegue rápido y mantenimiento programado',
      
      // Services Section
      'services.title': '<span class="accent">Servicios</span> del Grupo',
      'services.intro': 'Capacidades a nivel de grupo entregadas en todos los departamentos de Misra.',
      'services.env.title': 'Servicios Ambientales y Recolección de Residuos',
      'services.env.desc': 'Programas de recolección, clasificación y mejora ambiental para nuestros sitios y socios externos.',
      'services.poultry.title': 'Operaciones Avícolas',
      'services.poultry.desc': 'Soporte para granjas y sitios de procesamiento con protocolos de bioseguridad.',
      'services.olive.title': 'Operaciones de Aceite de Oliva',
      'services.olive.desc': 'Soporte higiénico y operacional para prensas de aceite de oliva y líneas de extracción.',
      'services.logistics.title': 'Logística y Exportación',
      'services.logistics.desc': 'Cadenas logísticas, cumplimiento aduanero y cronogramas confiables a nuestros mercados.',
      'services.quality.title': 'Calidad y Cumplimiento del Grupo',
      'services.quality.desc': 'Auditorías, informes y mejora continua en todo el grupo.',
      
      // Sectors Section
      'sectors.title': 'Industrias que <span class="accent">servimos</span>',
      'sectors.poultry.title': 'Granjas Avícolas',
      'sectors.poultry.desc': 'Programas centrados en bioseguridad para controlar patógenos y contaminación cruzada.',
      'sectors.olive.title': 'Prensas de Aceite de Oliva',
      'sectors.olive.desc': 'Eliminación de residuos y aceite mientras protege entornos de grado alimentario.',
      'sectors.hotels.title': 'Hoteles',
      'sectors.hotels.desc': 'Limpieza profunda en áreas traseras y horarios de desinfección en áreas frontales.',
      'sectors.municipal.title': 'Sitios de Residuos Municipales',
      'sectors.municipal.desc': 'Supresión de olores y descontaminación para instalaciones de alta carga.',
      
      // Clients Section
      'clients.title': 'Nuestros <span class="accent">Clientes</span>',
      'clients.intro': 'Confiado por líderes operacionales en agricultura, hotelería y obras públicas.',
      
      // Why Section
      'why.title': 'Por qué <span class="accent">elegirnos</span>',
      'why.benefit1': '<strong>Limpieza sin rastro</strong> — acabado que se ve impecable y prueba aún mejor.',
      'why.benefit2': '<strong>Cumplimiento</strong> — alineado con regulaciones locales e industriales.',
      'why.benefit3': '<strong>Seguridad</strong> — EPP estricto y controles de peligros.',
      'why.benefit4': '<strong>Respuesta rápida</strong> — movilización rápida cuando lo necesita.',
      'why.benefit5': '<strong>Eco-consciente</strong> — agua reducida, química responsable.',
      'why.guarantee.eyebrow': 'Garantía',
      'why.guarantee.title': 'No dejamos rastro.',
      'why.guarantee.desc': 'Nuestro nombre es nuestra promesa. Desde cargas microbianas hasta residuos visibles, lo eliminamos—documentado.',
      'why.guarantee.cta': 'Contáctanos',
      
      // Insights Section
      'insights.eyebrow': 'Insights',
      'insights.title': 'Guías y Mejores Prácticas',
      'insights.intro': 'Métodos prácticos y verificables que usamos en entornos industriales.',
      'insights.atp.title': 'Pruebas ATP para Saneamiento: Umbrales e Informes',
      'insights.atp.desc': 'Por qué importa el ATP, cómo muestreamos, y los rangos de aprobado/reprobado que apuntamos en zonas de alto riesgo.',
      'insights.atp.cta': 'Hablar con un experto',
      'insights.odor.title': 'Control de Olores en Sitios de Residuos Municipales: Un Manual Práctico',
      'insights.odor.desc': 'Identificación de fuentes, química de neutralización y métricas de supresión medibles.',
      'insights.odor.cta': 'Solicitar el SOP completo',
      
      // FAQ Section
      'faq.eyebrow': 'FAQ',
      'faq.title': 'Preguntas Frecuentes',
      'faq.q1': '¿Qué industrias atienden?',
      'faq.a1': 'Apoyamos granjas avícolas, prensas de aceite de oliva, hoteles y sitios de residuos municipales con limpieza centrada en el cumplimiento.',
      'faq.q2': '¿Proporcionan limpieza de emergencia?',
      'faq.a2': 'Sí. Movilizamos protocolos de contención rápida y desinfección para eventos críticos.',
      'faq.q3': '¿Cómo podemos solicitar una cotización?',
      'faq.a3': 'Use el formulario de contacto o envíe un email a contact@misragroup.website con los detalles de su sitio. Respondemos dentro de un día hábil.'
    },
    DE: {
      // Navigation
      'nav.home': 'Startseite',
      'nav.poultry': 'Geflügel',
      'nav.olive': 'Olive',
      'nav.export': 'Export',
      'nav.zerotrace': 'Zero Trace',
      'nav.contact': 'Kontakt',
      
      // Hero Section
      'hero.title': 'Misra Group — <span class="accent">Eine Gruppe</span>, Viele Expertenabteilungen.',
      'hero.subtitle': 'Eine einheitliche Gruppe, die Reinigung und Desinfektion, Geflügel, Olivenölverarbeitung, Export und mehr abdeckt—Compliance zuerst, messbare Ergebnisse, schnelle Reaktion.',
      'hero.cta1': 'Abteilungen Erkunden',
      'hero.cta2': 'Über Misra Group',
      'hero.badge1': 'Multi‑Abteilung',
      'hero.badge2': 'Compliance zuerst',
      'hero.badge3': 'Schnelle Reaktion',
      
      // Departments Section
      'departments.title': 'Unsere <span class="accent">Abteilungen</span>',
      'departments.intro': 'Erkunden Sie Misra Groups Divisionen, die die Industrie von Ende zu Ende bedienen.',
      'departments.waste.title': 'Abfallsammlung & Umweltdienstleistungen',
      'departments.waste.desc': 'Sammlung, Sortierung und Umweltprogramme für Misra-Standorte und externe Unternehmen.',
      'departments.waste.cta': 'Mehr erfahren',
      'departments.poultry.title': 'Geflügel',
      'departments.poultry.desc': 'Biosicherheits-geführte Programme für Farmen und Verarbeitungsumgebungen.',
      'departments.poultry.cta': 'Mehr erfahren',
      'departments.olive.title': 'Olivenöl',
      'departments.olive.desc': 'Rückstandsmanagement und hygienische Operationen für Olivenölpressen.',
      'departments.olive.cta': 'Mehr erfahren',
      'departments.export.title': 'Export',
      'departments.export.desc': 'Logistik- und Exportdienstleistungen mit zuverlässigen Zeitplänen.',
      'departments.export.cta': 'Mehr erfahren',
      
      // About Section
      'about.title': 'Über <span class="accent">Misra Group</span>',
      'about.desc': 'Misra Group ist eine multi‑abteilungs Industriegruppe mit Farmen und Olivenölpressen, plus einer Exportabteilung. Zero Trace ist unser Abfallsammlungs- und Umweltdienstleistungsunternehmen—geschaffen, um Misra Group Operationen zu dienen und jetzt auch externe Unternehmen zu bedienen.',
      'about.point1': 'Umweltfreundliche, wissenschaftlich fundierte Methoden',
      'about.point2': 'Compliance-fokussierte Protokolle und Berichterstattung',
      'about.point3': 'Industrietaugliche Ausrüstung und PSA',
      'about.point4': 'Schneller Einsatz und geplante Wartung',
      
      // Services Section
      'services.title': 'Gruppen-<span class="accent">Services</span>',
      'services.intro': 'Gruppenweite Fähigkeiten, die in allen Misra-Abteilungen geliefert werden.',
      'services.env.title': 'Umweltdienstleistungen & Abfallsammlung',
      'services.env.desc': 'Programme für Sammlung, Sortierung und Umweltverbesserung für unsere Standorte und externe Partner.',
      'services.poultry.title': 'Geflügeloperationen',
      'services.poultry.desc': 'Unterstützung für Farmen und Verarbeitungsstandorte mit Biosicherheitsprotokollen.',
      'services.olive.title': 'Olivenöl-Operationen',
      'services.olive.desc': 'Hygienische und operative Unterstützung für Olivenölpressen und Extraktionslinien.',
      'services.logistics.title': 'Logistik & Export',
      'services.logistics.desc': 'Logistikketten, Zollkonformität und zuverlässige Zeitpläne zu unseren Märkten.',
      'services.quality.title': 'Gruppenqualität & Compliance',
      'services.quality.desc': 'Audits, Berichterstattung und kontinuierliche Verbesserung in der gesamten Gruppe.',
      
      // Sectors Section
      'sectors.title': 'Branchen, die wir <span class="accent">bedienen</span>',
      'sectors.poultry.title': 'Geflügelfarmen',
      'sectors.poultry.desc': 'Biosicherheits-erste Programme zur Kontrolle von Pathogenen und Kreuzkontamination.',
      'sectors.olive.title': 'Olivenölpressen',
      'sectors.olive.desc': 'Rückstands- und Ölentfernung bei gleichzeitigem Schutz von lebensmitteltauglichen Umgebungen.',
      'sectors.hotels.title': 'Hotels',
      'sectors.hotels.desc': 'Tiefenreinigung im Hintergrund und Desinfektionspläne im Vordergrund.',
      'sectors.municipal.title': 'Kommunale Abfallstandorte',
      'sectors.municipal.desc': 'Geruchsunterdrückung und Dekontamination für Hochlastanlagen.',
      
      // Clients Section
      'clients.title': 'Unsere <span class="accent">Kunden</span>',
      'clients.intro': 'Vertraut von Betriebsleitern in Landwirtschaft, Gastgewerbe und öffentlichen Arbeiten.',
      
      // Why Section
      'why.title': 'Warum <span class="accent">uns wählen</span>',
      'why.benefit1': '<strong>Spurlose Reinigung</strong> — Finish, das makellos aussieht und noch besser testet.',
      'why.benefit2': '<strong>Compliance</strong> — abgestimmt auf lokale und industrielle Vorschriften.',
      'why.benefit3': '<strong>Sicherheit</strong> — strenge PSA und Gefahrenkontrollen.',
      'why.benefit4': '<strong>Schnelle Reaktion</strong> — schnelle Mobilisierung, wenn Sie es brauchen.',
      'why.benefit5': '<strong>Umweltbewusst</strong> — reduziertes Wasser, verantwortliche Chemie.',
      'why.guarantee.eyebrow': 'Garantie',
      'why.guarantee.title': 'Wir hinterlassen keine Spuren.',
      'why.guarantee.desc': 'Unser Name ist unser Versprechen. Von mikrobiellen Lasten bis zu sichtbaren Rückständen entfernen wir es—dokumentiert.',
      'why.guarantee.cta': 'Kontaktieren Sie uns',
      
      // Insights Section
      'insights.eyebrow': 'Einblicke',
      'insights.title': 'Leitfäden und Best Practices',
      'insights.intro': 'Praktische, überprüfbare Methoden, die wir in industriellen Umgebungen verwenden.',
      'insights.atp.title': 'ATP-Tests für Sanitization: Schwellenwerte und Berichterstattung',
      'insights.atp.desc': 'Warum ATP wichtig ist, wie wir Proben nehmen und die Bestehen/Nicht-Bestehen-Bereiche, die wir in Hochrisikozonen anstreben.',
      'insights.atp.cta': 'Mit einem Experten sprechen',
      'insights.odor.title': 'Geruchskontrolle in kommunalen Abfallstandorten: Ein praktisches Handbuch',
      'insights.odor.desc': 'Quellidentifikation, Neutralisationschemie und messbare Unterdrückungsmetriken.',
      'insights.odor.cta': 'Vollständige SOP anfordern',
      
      // FAQ Section
      'faq.eyebrow': 'FAQ',
      'faq.title': 'Häufige Fragen',
      'faq.q1': 'Welche Branchen bedienen Sie?',
      'faq.a1': 'Wir unterstützen Geflügelfarmen, Olivenölpressen, Hotels und kommunale Abfallstandorte mit compliance-orientierter Reinigung.',
      'faq.q2': 'Bieten Sie Notfallreinigung an?',
      'faq.a2': 'Ja. Wir mobilisieren schnelle Eindämmungs- und Desinfektionsprotokolle für kritische Ereignisse.',
      'faq.q3': 'Wie können wir ein Angebot anfordern?',
      'faq.a3': 'Verwenden Sie das Kontaktformular oder senden Sie eine E-Mail an contact@misragroup.website mit Ihren Standortdetails. Wir antworten innerhalb eines Werktags.'
    },
    AR: {
      // Navigation
      'nav.home': 'الرئيسية',
      'nav.poultry': 'الدواجن',
      'nav.olive': 'الزيتون',
      'nav.export': 'التصدير',
      'nav.zerotrace': 'زيرو تريس',
      'nav.contact': 'اتصل بنا',
      
      // Hero Section
      'hero.title': 'مجموعة ميسرا — <span class="accent">مجموعة واحدة</span>، أقسام خبيرة متعددة.',
      'hero.subtitle': 'مجموعة موحدة تغطي التنظيف والتعقيم، الدواجن، معالجة زيت الزيتون، التصدير وأكثر—الامتثال أولاً، نتائج قابلة للقياس، استجابة سريعة.',
      'hero.cta1': 'استكشف الأقسام',
      'hero.cta2': 'حول مجموعة ميسرا',
      'hero.badge1': 'متعدد الأقسام',
      'hero.badge2': 'الامتثال أولاً',
      'hero.badge3': 'استجابة سريعة',
      
      // Departments Section
      'departments.title': '<span class="accent">أقسامنا</span>',
      'departments.intro': 'استكشف أقسام مجموعة ميسرا التي تخدم الصناعة من البداية إلى النهاية.',
      'departments.waste.title': 'جمع النفايات والخدمات البيئية',
      'departments.waste.desc': 'الجمع والفرز والبرامج البيئية لمواقع ميسرا والشركات الخارجية.',
      'departments.waste.cta': 'اعرف المزيد',
      'departments.poultry.title': 'الدواجن',
      'departments.poultry.desc': 'برامج تقودها الأمان الحيوي للمزارع وبيئات المعالجة.',
      'departments.poultry.cta': 'اعرف المزيد',
      'departments.olive.title': 'زيت الزيتون',
      'departments.olive.desc': 'إدارة المخلفات والعمليات الصحية لمعاصر زيت الزيتون.',
      'departments.olive.cta': 'اعرف المزيد',
      'departments.export.title': 'التصدير',
      'departments.export.desc': 'خدمات اللوجستيات والتصدير مع جداول زمنية موثوقة.',
      'departments.export.cta': 'اعرف المزيد',
      
      // About Section
      'about.title': 'حول <span class="accent">مجموعة ميسرا</span>',
      'about.desc': 'مجموعة ميسرا هي مجموعة صناعية متعددة الأقسام مع مزارع ومعاصر زيت الزيتون، بالإضافة إلى قسم التصدير. زيرو تريس هي شركة جمع النفايات والخدمات البيئية—أُنشئت لخدمة عمليات مجموعة ميسرا والآن تخدم أيضاً الشركات الخارجية.',
      'about.point1': 'طرق صديقة للبيئة مدعومة علمياً',
      'about.point2': 'بروتوكولات وتقارير تركز على الامتثال',
      'about.point3': 'معدات ووسائل حماية شخصية صناعية',
      'about.point4': 'نشر سريع وصيانة مجدولة',
      
      // Services Section
      'services.title': '<span class="accent">خدمات</span> المجموعة',
      'services.intro': 'قدرات على مستوى المجموعة تُقدم عبر أقسام ميسرا.',
      'services.env.title': 'الخدمات البيئية وجمع النفايات',
      'services.env.desc': 'برامج الجمع والفرز والتحسين البيئي لمواقعنا والشركاء الخارجيين.',
      'services.poultry.title': 'عمليات الدواجن',
      'services.poultry.desc': 'دعم للمزارع ومواقع المعالجة مع بروتوكولات الأمان الحيوي.',
      'services.olive.title': 'عمليات زيت الزيتون',
      'services.olive.desc': 'دعم صحي وتشغيلي لمعاصر زيت الزيتون وخطوط الاستخراج.',
      'services.logistics.title': 'اللوجستيات والتصدير',
      'services.logistics.desc': 'سلاسل لوجستية، امتثال جمركي وجداول زمنية موثوقة لأسواقنا.',
      'services.quality.title': 'جودة المجموعة والامتثال',
      'services.quality.desc': 'مراجعات وتقارير وتحسين مستمر عبر المجموعة.',
      
      // Sectors Section
      'sectors.title': 'الصناعات التي <span class="accent">نخدمها</span>',
      'sectors.poultry.title': 'مزارع الدواجن',
      'sectors.poultry.desc': 'برامج تركز على الأمان الحيوي للتحكم في مسببات الأمراض والتلوث المتقاطع.',
      'sectors.olive.title': 'معاصر زيت الزيتون',
      'sectors.olive.desc': 'إزالة المخلفات والزيت مع حماية البيئات الغذائية.',
      'sectors.hotels.title': 'الفنادق',
      'sectors.hotels.desc': 'تنظيف عميق في الخلف وجداول تطهير في المقدمة.',
      'sectors.municipal.title': 'مواقع النفايات البلدية',
      'sectors.municipal.desc': 'قمع الروائح وإزالة التلوث للمنشآت عالية الحمولة.',
      
      // Clients Section
      'clients.title': '<span class="accent">عملاؤنا</span>',
      'clients.intro': 'موثوق به من قبل قادة العمليات في الزراعة والضيافة والأشغال العامة.',
      
      // Why Section
      'why.title': 'لماذا <span class="accent">تختارنا</span>',
      'why.benefit1': '<strong>تنظيف بلا أثر</strong> — لمسة نهائية تبدو نقية وتختبر أفضل.',
      'why.benefit2': '<strong>الامتثال</strong> — متماشي مع اللوائح المحلية والصناعية.',
      'why.benefit3': '<strong>السلامة</strong> — وسائل حماية صارمة وضوابط المخاطر.',
      'why.benefit4': '<strong>استجابة سريعة</strong> — تعبئة سريعة عند الحاجة.',
      'why.benefit5': '<strong>واعي بيئياً</strong> — مياه أقل، كيمياء مسؤولة.',
      'why.guarantee.eyebrow': 'ضمان',
      'why.guarantee.title': 'لا نترك أي أثر.',
      'why.guarantee.desc': 'اسمنا هو وعدنا. من الأحمال الميكروبية إلى المخلفات المرئية، نزيلها—موثقة.',
      'why.guarantee.cta': 'اتصل بنا',
      
      // Insights Section
      'insights.eyebrow': 'رؤى',
      'insights.title': 'الأدلة وأفضل الممارسات',
      'insights.intro': 'طرق عملية وقابلة للتحقق نستخدمها في البيئات الصناعية.',
      'insights.atp.title': 'اختبار ATP للتعقيم: العتبات والتقارير',
      'insights.atp.desc': 'لماذا ATP مهم، كيف نأخذ العينات، ونطاقات النجاح/الفشل التي نستهدفها في المناطق عالية المخاطر.',
      'insights.atp.cta': 'تحدث مع خبير',
      'insights.odor.title': 'التحكم في الروائح في مواقع النفايات البلدية: دليل عملي',
      'insights.odor.desc': 'تحديد المصدر، كيمياء التعادل، ومقاييس القمع القابلة للقياس.',
      'insights.odor.cta': 'اطلب إجراءات التشغيل الكاملة',
      
      // FAQ Section
      'faq.eyebrow': 'الأسئلة الشائعة',
      'faq.title': 'الأسئلة الشائعة',
      'faq.q1': 'ما الصناعات التي تخدمونها؟',
      'faq.a1': 'ندعم مزارع الدواجن ومعاصر زيت الزيتون والفنادق ومواقع النفايات البلدية بتنظيف يركز على الامتثال.',
      'faq.q2': 'هل تقدمون تنظيف طوارئ؟',
      'faq.a2': 'نعم. نعبئ بروتوكولات احتواء سريع وتطهير للأحداث الحرجة.',
      'faq.q3': 'كيف يمكننا طلب عرض سعر؟',
      'faq.a3': 'استخدم نموذج الاتصال أو أرسل بريد إلكتروني إلى contact@misragroup.website مع تفاصيل موقعك. نرد خلال يوم عمل واحد.'
    }
  };
  
  // Function to translate content - clean version
  function translateContent(lang) {
    console.log('🔄 Translating to:', lang);
    const translations = cleanTranslations[lang];
    if (!translations) {
      console.error('❌ No translations found for:', lang);
      return;
    }
    
    // Navigation
    const navLinks = document.querySelectorAll('.new-nav-link');
    const navKeys = ['nav.home', 'nav.poultry', 'nav.olive', 'nav.export', 'nav.zerotrace', 'nav.contact'];
    navLinks.forEach((link, index) => {
      if (translations[navKeys[index]]) {
        link.textContent = translations[navKeys[index]];
      }
    });
    
    // Hero Section
    const heroTitle = document.querySelector('#home .headline');
    const heroSubtitle = document.querySelector('#home .subhead');
    const heroCta1 = document.querySelector('#home .hero-ctas .btn-primary');
    const heroCta2 = document.querySelector('#home .hero-ctas .btn-outline');
    const heroBadges = document.querySelectorAll('#home .hero-badges span');
    
    if (heroTitle) heroTitle.innerHTML = translations['hero.title'];
    if (heroSubtitle) heroSubtitle.textContent = translations['hero.subtitle'];
    if (heroCta1) heroCta1.innerHTML = '<span class="icon-left">🏢</span>' + translations['hero.cta1'];
    if (heroCta2) heroCta2.textContent = translations['hero.cta2'];
    
    const badgeKeys = ['hero.badge1', 'hero.badge2', 'hero.badge3'];
    heroBadges.forEach((badge, index) => {
      if (translations[badgeKeys[index]]) {
        badge.textContent = translations[badgeKeys[index]];
      }
    });
    
    // Departments Section
    const deptTitle = document.querySelector('#departments h2');
    const deptIntro = document.querySelector('#departments .section-intro');
    const deptCards = document.querySelectorAll('#departments .card');
    
    if (deptTitle) deptTitle.innerHTML = translations['departments.title'];
    if (deptIntro) deptIntro.textContent = translations['departments.intro'];
    
    const deptKeys = [
      ['departments.waste.title', 'departments.waste.desc', 'departments.waste.cta'],
      ['departments.poultry.title', 'departments.poultry.desc', 'departments.poultry.cta'],
      ['departments.olive.title', 'departments.olive.desc', 'departments.olive.cta'],
      ['departments.export.title', 'departments.export.desc', 'departments.export.cta']
    ];
    
    deptCards.forEach((card, index) => {
      const h3 = card.querySelector('h3');
      const p = card.querySelector('p');
      const a = card.querySelector('a');
      if (h3 && translations[deptKeys[index][0]]) h3.textContent = translations[deptKeys[index][0]];
      if (p && translations[deptKeys[index][1]]) p.textContent = translations[deptKeys[index][1]];
      if (a && translations[deptKeys[index][2]]) a.textContent = translations[deptKeys[index][2]];
    });
    
    // About Section
    const aboutTitle = document.querySelector('#about h2');
    const aboutDesc = document.querySelector('#about p');
    const aboutPoints = document.querySelectorAll('#about .checklist li');
    
    if (aboutTitle) aboutTitle.innerHTML = translations['about.title'];
    if (aboutDesc) aboutDesc.textContent = translations['about.desc'];
    
    const aboutKeys = ['about.point1', 'about.point2', 'about.point3', 'about.point4'];
    aboutPoints.forEach((point, index) => {
      if (translations[aboutKeys[index]]) {
        point.textContent = translations[aboutKeys[index]];
      }
    });
    
    // Services Section
    const servicesTitle = document.querySelector('#services h2');
    const servicesIntro = document.querySelector('#services .section-intro');
    const serviceCards = document.querySelectorAll('#services .card');
    
    if (servicesTitle) servicesTitle.innerHTML = translations['services.title'];
    if (servicesIntro) servicesIntro.textContent = translations['services.intro'];
    
    const serviceKeys = [
      ['services.env.title', 'services.env.desc'],
      ['services.poultry.title', 'services.poultry.desc'],
      ['services.olive.title', 'services.olive.desc'],
      ['services.logistics.title', 'services.logistics.desc'],
      ['services.quality.title', 'services.quality.desc']
    ];
    
    serviceCards.forEach((card, index) => {
      const h3 = card.querySelector('h3');
      const p = card.querySelector('p');
      if (h3 && translations[serviceKeys[index][0]]) h3.textContent = translations[serviceKeys[index][0]];
      if (p && translations[serviceKeys[index][1]]) p.textContent = translations[serviceKeys[index][1]];
    });
    
    // Sectors Section
    const sectorsTitle = document.querySelector('#sectors h2');
    const sectorCards = document.querySelectorAll('#sectors .card');
    
    if (sectorsTitle) sectorsTitle.innerHTML = translations['sectors.title'];
    
    const sectorKeys = [
      ['sectors.poultry.title', 'sectors.poultry.desc'],
      ['sectors.olive.title', 'sectors.olive.desc'],
      ['sectors.hotels.title', 'sectors.hotels.desc'],
      ['sectors.municipal.title', 'sectors.municipal.desc']
    ];
    
    sectorCards.forEach((card, index) => {
      const h3 = card.querySelector('h3');
      const p = card.querySelector('p');
      if (h3 && translations[sectorKeys[index][0]]) h3.textContent = translations[sectorKeys[index][0]];
      if (p && translations[sectorKeys[index][1]]) p.textContent = translations[sectorKeys[index][1]];
    });
    
    // Clients Section
    const clientsTitle = document.querySelector('#clients h2');
    const clientsIntro = document.querySelector('#clients .section-intro');
    
    if (clientsTitle) clientsTitle.innerHTML = translations['clients.title'];
    if (clientsIntro) clientsIntro.textContent = translations['clients.intro'];
    
    // Why Section
    const whyTitle = document.querySelector('#why h2');
    const whyBenefits = document.querySelectorAll('#why .benefits li');
    const whyEyebrow = document.querySelector('#why .eyebrow');
    const whyGuaranteeTitle = document.querySelector('#why .highlight-card h3');
    const whyGuaranteeDesc = document.querySelector('#why .highlight-card p:nth-of-type(2)');
    const whyGuaranteeCta = document.querySelector('#why .highlight-card a');
    
    if (whyTitle) whyTitle.innerHTML = translations['why.title'];
    if (whyEyebrow) whyEyebrow.textContent = translations['why.guarantee.eyebrow'];
    if (whyGuaranteeTitle) whyGuaranteeTitle.textContent = translations['why.guarantee.title'];
    if (whyGuaranteeDesc) whyGuaranteeDesc.textContent = translations['why.guarantee.desc'];
    if (whyGuaranteeCta) whyGuaranteeCta.innerHTML = '<span class="icon-left">✉️</span>' + translations['why.guarantee.cta'];
    
    const benefitKeys = ['why.benefit1', 'why.benefit2', 'why.benefit3', 'why.benefit4', 'why.benefit5'];
    whyBenefits.forEach((benefit, index) => {
      if (translations[benefitKeys[index]]) {
        benefit.innerHTML = translations[benefitKeys[index]];
      }
    });
    
    // Insights Section
    const insightsEyebrow = document.querySelector('#insights .eyebrow');
    const insightsTitle = document.querySelector('#insights h2');
    const insightsIntro = document.querySelector('#insights .section-intro');
    const insightCards = document.querySelectorAll('#insights .card');
    
    if (insightsEyebrow) insightsEyebrow.textContent = translations['insights.eyebrow'];
    if (insightsTitle) insightsTitle.textContent = translations['insights.title'];
    if (insightsIntro) insightsIntro.textContent = translations['insights.intro'];
    
    const insightKeys = [
      ['insights.atp.title', 'insights.atp.desc', 'insights.atp.cta'],
      ['insights.odor.title', 'insights.odor.desc', 'insights.odor.cta']
    ];
    
    insightCards.forEach((card, index) => {
      const h3 = card.querySelector('h3');
      const p = card.querySelector('p');
      const a = card.querySelector('a');
      if (h3 && translations[insightKeys[index][0]]) h3.textContent = translations[insightKeys[index][0]];
      if (p && translations[insightKeys[index][1]]) p.textContent = translations[insightKeys[index][1]];
      if (a && translations[insightKeys[index][2]]) a.textContent = translations[insightKeys[index][2]];
    });
    
    // FAQ Section
    const faqEyebrow = document.querySelector('#faq .eyebrow');
    const faqTitle = document.querySelector('#faq h2');
    const faqCards = document.querySelectorAll('#faq .card');
    
    if (faqEyebrow) faqEyebrow.textContent = translations['faq.eyebrow'];
    if (faqTitle) faqTitle.textContent = translations['faq.title'];
    
    const faqKeys = [
      ['faq.q1', 'faq.a1'],
      ['faq.q2', 'faq.a2'],
      ['faq.q3', 'faq.a3']
    ];
    
    faqCards.forEach((card, index) => {
      const h3 = card.querySelector('h3');
      const p = card.querySelector('p');
      if (h3 && translations[faqKeys[index][0]]) h3.textContent = translations[faqKeys[index][0]];
      if (p && translations[faqKeys[index][1]]) p.textContent = translations[faqKeys[index][1]];
    });
    
    console.log('✅ Translation completed for:', lang);
  }
  
  // Toggle dropdown
  function toggleDropdown() {
    const isOpen = cleanLangDropdown.classList.contains('show');
    if (isOpen) {
      closeDropdown();
    } else {
      openDropdown();
    }
  }
  
  // Open dropdown
  function openDropdown() {
    cleanLangDropdown.classList.add('show');
    cleanLangButton.setAttribute('aria-expanded', 'true');
    cleanLangDropdown.setAttribute('aria-hidden', 'false');
    updateActiveItem();
  }
  
  // Close dropdown
  function closeDropdown() {
    cleanLangDropdown.classList.remove('show');
    cleanLangButton.setAttribute('aria-expanded', 'false');
    cleanLangDropdown.setAttribute('aria-hidden', 'true');
  }
  
  // Update active item in dropdown
  function updateActiveItem() {
    const items = cleanLangDropdown.querySelectorAll('li');
    items.forEach(item => {
      const langCode = item.getAttribute('data-clean-lang');
      if (langCode === currentLang) {
        item.classList.add('active');
      } else {
        item.classList.remove('active');
      }
    });
  }
  
  // Set language
  function setLanguage(langCode) {
    console.log('🌍 Setting language to:', langCode);
    
    currentLang = langCode;
    cleanCurrentLang.textContent = langCode;
    
    // Update flag icon
    const flagMap = {
      'EN': { src: 'https://flagcdn.com/w20/gb.png', alt: 'English' },
      'FR': { src: 'https://flagcdn.com/w20/fr.png', alt: 'Français' },
      'ES': { src: 'https://flagcdn.com/w20/es.png', alt: 'Español' },
      'DE': { src: 'https://flagcdn.com/w20/de.png', alt: 'Deutsch' },
      'AR': { src: 'https://flagcdn.com/w20/tn.png', alt: 'العربية' }
    };
    
    if (currentLangFlag && flagMap[langCode]) {
      currentLangFlag.src = flagMap[langCode].src;
      currentLangFlag.alt = flagMap[langCode].alt;
    }
    
    // Set document language and direction
    const langCodes = { EN: 'en', FR: 'fr', ES: 'es', DE: 'de', AR: 'ar' };
    document.documentElement.lang = langCodes[langCode];
    document.documentElement.dir = langCode === 'AR' ? 'rtl' : 'ltr';
    
    // Translate content
    translateContent(langCode);
    
    // Save language preference
    localStorage.setItem('cleanLangSwitcherLang', langCode);
    
    // Update active item
    updateActiveItem();
    
    console.log('✅ Language changed to:', langCode);
  }
  
  // Event listeners
  cleanLangButton.addEventListener('click', function(e) {
    e.preventDefault();
    console.log('🖱️ Clean language button clicked');
    toggleDropdown();
  });
  
  cleanThemeToggle.addEventListener('click', function(e) {
    e.preventDefault();
    console.log('🖱️ Clean theme toggle clicked');
    toggleTheme();
  });
  
  // Navigation menu event listeners
  newNavToggle.addEventListener('click', function(e) {
    e.preventDefault();
    console.log('🖱️ Navigation toggle clicked');
    toggleNavMenu();
  });
  
  // Close menu when clicking on a link
  newNavMenu.addEventListener('click', function(e) {
    if (e.target.matches('.new-nav-link')) {
      console.log('🖱️ Navigation link clicked');
      closeNavMenu();
    }
  });
  
  // Close menu when clicking outside
  document.addEventListener('click', function(e) {
    if (!newNav.contains(e.target)) {
      closeNavMenu();
    }
  });
  
  // Close menu on escape key
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
      closeNavMenu();
    }
  });
  
  // Handle dropdown item clicks
  cleanLangDropdown.addEventListener('click', function(e) {
    e.preventDefault();
    e.stopPropagation();
    
    const listItem = e.target.closest('li[data-clean-lang]');
    if (listItem) {
      const selectedLang = listItem.getAttribute('data-clean-lang');
      console.log('🖱️ Clicked language:', selectedLang);
      setLanguage(selectedLang);
      closeDropdown();
    }
  });
  
  // Close dropdown when clicking outside
  document.addEventListener('click', function(e) {
    if (!cleanLangButton.contains(e.target) && !cleanLangDropdown.contains(e.target)) {
      closeDropdown();
    }
  });
  
  // Close dropdown on escape key
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
      closeDropdown();
    }
  });
  
  // Load saved preferences on page load
  document.addEventListener('DOMContentLoaded', function() {
    // Load saved language
    const savedLang = localStorage.getItem('cleanLangSwitcherLang') || 'EN';
    if (langs.includes(savedLang)) {
      console.log('📱 Loading saved language:', savedLang);
      setLanguage(savedLang);
    }
    
    // Load saved theme
    const savedTheme = getTheme();
    console.log('📱 Loading saved theme:', savedTheme);
    setTheme(savedTheme);
  });
  
  // Initialize immediately if DOM is already loaded
  if (document.readyState === 'loading') {
    // DOM is still loading, wait for DOMContentLoaded
  } else {
    // DOM is already loaded
    const savedLang = localStorage.getItem('cleanLangSwitcherLang') || 'EN';
    if (langs.includes(savedLang)) {
      console.log('📱 Loading saved language (immediate):', savedLang);
      setLanguage(savedLang);
    }
    
    // Load saved theme immediately
    const savedTheme = getTheme();
    console.log('📱 Loading saved theme (immediate):', savedTheme);
    setTheme(savedTheme);
  }
})();

