// Misra Group - Clean Consolidated Script
// Removes all duplicates and consolidates functionality

// =============================================================================
// TRANSLATION DATA
// =============================================================================

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
		'contact.error.rate': 'You can send only one request per hour. Please try again later.',
		'contact.address': 'Sfax, Sakiet Ezzit, Tunisia',
		'home.meta.title': 'Misra Group — Industrial Services & Departments',
		'home.meta.description': 'Misra Group is a multi‑department industrial group. Zero Trace is our waste collection and environmental services arm.',
		'home.hero.headline.html': 'Misra Group — <span class="accent">One Group</span>, Many Expert Departments.',
		'home.hero.subhead': 'A unified group covering cleaning & sanitization, poultry, olive‑oil processing, exports and more—compliance‑first, measurable results, fast response.',
		'home.hero.cta.primary': 'Explore Departments',
		'home.hero.cta.secondary': 'About Misra Group',
		'home.hero.badge1': 'Multi‑department',
		'home.hero.badge2': 'Compliance‑first',
		'home.hero.badge3': 'Fast Response',
		'departments.title': 'Our <span class="accent">Departments</span>',
		'departments.intro': 'Explore Misra Group\'s divisions serving industry end‑to‑end.',
		'departments.c1.title': 'Waste Collection & Environmental Services',
		'departments.c1.desc': 'Collection, sorting and environmental programs for Misra sites and external companies.',
		'departments.c1.cta': 'Learn more',
		'departments.c2.title': 'Poultry',
		'departments.c2.desc': 'Biosecurity‑led programs for farms and processing environments.',
		'departments.c2.cta': 'Learn more',
		'departments.c3.title': 'Olive‑oil',
		'departments.c3.desc': 'Residue management and hygienic operations for olive‑oil presses.',
		'departments.c3.cta': 'Learn more',
		'departments.c4.title': 'Export',
		'departments.c4.desc': 'Logistics and export services with reliable timelines.',
		'departments.c4.cta': 'Learn more',
		
		// Navigation
		'nav.home': 'Home',
		'nav.poultry': 'Poultry',
		'nav.olive': 'Olive',
		'nav.export': 'Export',
		'nav.zerotrace': 'Zero Trace',
		'nav.contact': 'Contact',
		
		// About section
		'about.title.html': 'About <span class="accent">Misra Group</span>',
		'about.body': 'Misra Group is a multi‑department industrial group with farms and olive‑oil presses, plus an export department. Zero Trace is our waste collection and environmental services company—created to serve Misra Group operations and now serving external companies as well.',
		'about.li1': 'Eco‑friendly, science‑backed methods',
		'about.li2': 'Compliance‑focused protocols and reporting',
		'about.li3': 'Industrial‑grade equipment and PPE',
		'about.li4': 'Rapid deployment and scheduled maintenance',
		
		// Home services
		'home.services.title': 'Group <span class="accent">Services</span>',
		'home.services.intro': 'Group‑wide capabilities delivered across Misra departments.',
		'home.services.c1.title': 'Environmental Services & Waste Collection',
		'home.services.c1.desc': 'Programs for collection, sorting and environmental improvement for our sites and external partners.',
		'home.services.c2.title': 'Poultry Operations',
		'home.services.c2.desc': 'Support for farms and processing sites with biosecurity protocols.',
		'home.services.c3.title': 'Olive‑oil Operations',
		'home.services.c3.desc': 'Hygiene and operational support for olive‑oil presses and extraction lines.',
		'home.services.c4.title': 'Logistics & Export',
		'home.services.c4.desc': 'Logistics chains, customs compliance and reliable timelines to our markets.',
		'home.services.c5.title': 'Group Quality & Compliance',
		'home.services.c5.desc': 'Audits, reporting and continuous improvement across the group.',
		
		// Sectors
		'sectors.title': 'Industries We <span class="accent">Serve</span>',
		'sectors.c1.title': 'Poultry Farms',
		'sectors.c1.desc': 'Biosecurity-first programs to control pathogens and cross-contamination.',
		'sectors.c2.title': 'Olive-oil Presses',
		'sectors.c2.desc': 'Residue and oil removal while protecting food-grade environments.',
		'sectors.c3.title': 'Hotels',
		'sectors.c3.desc': 'Back-of-house deep cleaning and front-of-house disinfection schedules.',
		'sectors.c4.title': 'Municipal Waste Sites',
		'sectors.c4.desc': 'Odor suppression and decontamination for high-load facilities.',
		
		// Clients
		'clients.title': 'Our <span class="accent">Clients</span>',
		'clients.intro': 'Trusted by operations leaders across agriculture, hospitality, and public works.',
		
		// Why choose us
		'why.title': 'Why Choose <span class="accent">Us</span>',
		'why.b1': 'No-trace cleaning — finish that looks pristine and tests even better.',
		'why.b2': 'Compliance — aligned with local and industry regulations.',
		'why.b3': 'Safety — strict PPE and hazard controls.',
		'why.b4': 'Fast response — rapid mobilization when you need it.',
		'why.b5': 'Eco-conscious — reduced water, responsible chemistry.',
		
		// Guarantee
		'guarantee.eyebrow': 'Guarantee',
		'guarantee.title': 'We leave no trace.',
		'guarantee.body': 'Our name is our promise. From microbial loads to visible residue, we remove it—documented.',
		'guarantee.cta': 'Contact Us',
		
		// Insights
		'insights.eyebrow': 'Insights',
		'insights.title': 'Guides & Best Practices',
		'insights.intro': 'Practical, verifiable methods we use across industrial environments.',
		'insights.a1.title': 'ATP Testing for Sanitization: Thresholds and Reporting',
		'insights.a1.desc': 'Why ATP matters, how we sample, and the pass/fail ranges we target in high‑risk zones.',
		'insights.a1.cta': 'Talk to an expert',
		'insights.a2.title': 'Odor Control in Municipal Waste Sites: A Practical Playbook',
		'insights.a2.desc': 'Source identification, neutralization chemistry, and measurable suppression metrics.',
		'insights.a2.cta': 'Request the full SOP',
		
		// FAQ
		'faq.eyebrow': 'FAQ',
		'faq.title': 'Common Questions',
		'faq.q1': 'Which industries do you serve?',
		'faq.a1': 'We support poultry farms, olive‑oil presses, hotels and municipal waste sites with compliance‑first cleaning.',
		'faq.q2': 'Do you provide emergency cleaning?',
		'faq.a2': 'Yes. We mobilize rapid containment and disinfection protocols for critical events.',
		'faq.q3': 'How can we request a quote?',
		'faq.a3': 'Use the contact form or email contact@misragroup.website with your site details. We reply within one business day.',
		
		// Zero Trace page specific translations
		'zerotrace.meta.title': 'Zero Trace — B2B Cleaning & Sanitization',
		'zerotrace.meta.description': 'Zero Trace provides professional B2B deep cleaning, disinfection, odor control, and eco-conscious sanitization for industrial sectors.',
		'zerotrace.hero.headline': 'Zero Trace — <span class="accent">Leave No Trace</span> After Our Work Is Done.',
		'zerotrace.hero.subhead': 'B2B deep cleaning and sanitization for industrial environments. We deliver compliance-ready, eco-conscious results that look, feel, and test cleaner.',
		'zerotrace.hero.cta.primary': 'Contact Us',
		'zerotrace.hero.cta.secondary': 'Explore Services',
		'zerotrace.hero.badge1': 'Eco-conscious',
		'zerotrace.hero.badge2': 'Compliance-first',
		'zerotrace.hero.badge3': 'Fast Response',
		'zerotrace.about.title': 'About Zero <span class="accent">Trace</span>',
		'zerotrace.about.body': 'We specialize in professional B2B cleaning and sanitation that meets rigorous industry standards. Our teams are trained for sensitive environments—from poultry farms to municipal waste sites—delivering measurable disinfection, residue removal, and odor control.',
		'zerotrace.about.li1': 'Eco-friendly, science-backed methods',
		'zerotrace.about.li2': 'Compliance-focused protocols and reporting',
		'zerotrace.about.li3': 'Industrial-grade equipment and PPE',
		'zerotrace.about.li4': 'Rapid deployment and scheduled maintenance',
		'zerotrace.services.title': 'Core <span class="accent">Services</span>',
		'zerotrace.services.intro': 'High-impact cleaning programs built for industrial reliability.',
		'zerotrace.services.c1.title': 'Deep Sanitization & Disinfection',
		'zerotrace.services.c1.desc': 'Hospital-grade disinfection and ATP-tested sanitation for high-risk zones.',
		'zerotrace.services.c2.title': 'Industrial Degreasing & Residue Removal',
		'zerotrace.services.c2.desc': 'Heavy-duty degreasers and foam cleaning for stubborn build-up and oils.',
		'zerotrace.services.c3.title': 'Odor Control & Deodorization',
		'zerotrace.services.c3.desc': 'Neutralization programs targeting bacterial and organic odor sources.',
		'zerotrace.services.c4.title': 'Waste Removal & Remediation',
		'zerotrace.services.c4.desc': 'Safe handling, sorting, and pre-treatment aligned with regulations.',
		'zerotrace.services.c5.title': 'Emergency Outbreak Cleaning',
		'zerotrace.services.c5.desc': 'Rapid containment and disinfection protocols for critical events.',
		'zerotrace.sectors.title': 'Industries We <span class="accent">Serve</span>',
		'zerotrace.sectors.c1.title': 'Poultry Farms',
		'zerotrace.sectors.c1.desc': 'Biosecurity-first programs to control pathogens and cross-contamination.',
		'zerotrace.sectors.c2.title': 'Olive-oil Presses',
		'zerotrace.sectors.c2.desc': 'Residue and oil removal while protecting food-grade environments.',
		'zerotrace.sectors.c3.title': 'Hotels',
		'zerotrace.sectors.c3.desc': 'Back-of-house deep cleaning and front-of-house disinfection schedules.',
		'zerotrace.sectors.c4.title': 'Municipal Waste Sites',
		'zerotrace.sectors.c4.desc': 'Odor suppression and decontamination for high-load facilities.',
		'zerotrace.clients.title': 'Our <span class="accent">Clients</span>',
		'zerotrace.clients.intro': 'Trusted by operations leaders across agriculture, hospitality, and public works.',
		'zerotrace.why.title': 'Why Choose <span class="accent">Us</span>',
		'zerotrace.why.b1': '<strong>No-trace cleaning</strong> — finish that looks pristine and tests even better.',
		'zerotrace.why.b2': '<strong>Compliance</strong> — aligned with local and industry regulations.',
		'zerotrace.why.b3': '<strong>Safety</strong> — strict PPE and hazard controls.',
		'zerotrace.why.b4': '<strong>Fast response</strong> — rapid mobilization when you need it.',
		'zerotrace.why.b5': '<strong>Eco-conscious</strong> — reduced water, responsible chemistry.',
		'zerotrace.guarantee.eyebrow': 'Guarantee',
		'zerotrace.guarantee.title': 'We leave no trace.',
		'zerotrace.guarantee.body': 'Our name is our promise. From microbial loads to visible residue, we remove it—documented.',
		'zerotrace.guarantee.cta': 'Contact Us',
		'zerotrace.insights.eyebrow': 'Insights',
		'zerotrace.insights.title': 'Guides & Best Practices',
		'zerotrace.insights.intro': 'Practical, verifiable methods we use across industrial environments.',
		'zerotrace.insights.a1.title': 'ATP Testing for Sanitization: Thresholds and Reporting',
		'zerotrace.insights.a1.desc': 'Why ATP matters, how we sample, and the pass/fail ranges we target in high‑risk zones.',
		'zerotrace.insights.a1.cta': 'Talk to an expert',
		'zerotrace.insights.a2.title': 'Odor Control in Municipal Waste Sites: A Practical Playbook',
		'zerotrace.insights.a2.desc': 'Source identification, neutralization chemistry, and measurable suppression metrics.',
		'zerotrace.insights.a2.cta': 'Request the full SOP',
		'zerotrace.faq.eyebrow': 'FAQ',
		'zerotrace.faq.title': 'Common Questions',
		'zerotrace.faq.q1': 'Which industries do you serve?',
		'zerotrace.faq.a1': 'We support poultry farms, olive‑oil presses, hotels and municipal waste sites with compliance‑first cleaning.',
		'zerotrace.faq.q2': 'Do you provide emergency cleaning?',
		'zerotrace.faq.a2': 'Yes. We mobilize rapid containment and disinfection protocols for critical events.',
		'zerotrace.faq.q3': 'How can we request a quote?',
		'zerotrace.faq.a3': 'Use the contact form or email contact@zerotrace.tn with your site details. We reply within one business day.',
		
		// Footer
		'footer.copyright': 'Misra Group. All rights reserved.'
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
		'contact.address': 'Sfax, Sakiet Ezzit, Tunisie',
		
		// Navigation
		'nav.home': 'Accueil',
		'nav.poultry': 'Avicole',
		'nav.olive': 'Oléicole',
		'nav.export': 'Export',
		'nav.zerotrace': 'Zero Trace',
		'nav.contact': 'Contact',
		
		'home.meta.title': 'Misra Group — Services industriels & Départements',
		'home.meta.description': 'Misra Group est un groupe multi‑départements. Zero Trace est notre pôle collecte des déchets et services environnementaux.',
		'home.hero.headline.html': 'Misra Group — <span class="accent">Un Groupe</span>, plusieurs départements experts.',
		'home.hero.subhead': 'Un groupe unifié couvrant nettoyage & désinfection, avicole, oléicole, export… conformité mesurable et réponse rapide.',
		'home.hero.cta.primary': 'Explorer les départements',
		'home.hero.cta.secondary': 'À propos de Misra Group',
		'home.hero.badge1': 'Multi‑départements',
		'home.hero.badge2': 'Conformité d\'abord',
		'home.hero.badge3': 'Réponse rapide',
		'departments.title': 'Nos <span class="accent">Départements</span>',
		'departments.intro': 'Découvrez les divisions du Groupe Misra au service de l\'industrie de bout en bout.',
		'departments.c1.title': 'Collecte des déchets & services environnementaux',
		'departments.c1.desc': 'Collecte, tri et programmes environnementaux pour Misra et des entreprises externes.',
		'departments.c1.cta': 'En savoir plus',
		'departments.c2.title': 'Avicole',
		'departments.c2.desc': 'Programmes guidés par la biosécurité pour fermes et sites de transformation.',
		'departments.c2.cta': 'En savoir plus',
		'departments.c3.title': 'Oléicole',
		'departments.c3.desc': 'Gestion des résidus et hygiène des huileries.',
		'departments.c3.cta': 'En savoir plus',
		'departments.c4.title': 'Export',
		'departments.c4.desc': 'Logistique et export avec délais fiables.',
		'departments.c4.cta': 'En savoir plus',
		
		// About section
		'about.title.html': 'À propos de <span class="accent">Misra Group</span>',
		'about.body': 'Misra Group est un groupe industriel multi‑départements avec des fermes et des huileries, plus un département export. Zero Trace est notre société de collecte de déchets et services environnementaux—créée pour servir les opérations de Misra Group et maintenant au service d\'entreprises externes également.',
		'about.li1': 'Méthodes écoresponsables et scientifiques',
		'about.li2': 'Protocoles de conformité et reporting',
		'about.li3': 'Équipements industriels et EPI',
		'about.li4': 'Déploiement rapide et maintenance planifiée',
		
		// Home services
		'home.services.title': 'Services du <span class="accent">Groupe</span>',
		'home.services.intro': 'Capacités clés offertes à travers les départements de Misra Group.',
		'home.services.c1.title': 'Services environnementaux & collecte des déchets',
		'home.services.c1.desc': 'Programmes de collecte, tri et amélioration environnementale pour nos sites et partenaires externes.',
		'home.services.c2.title': 'Opérations avicoles',
		'home.services.c2.desc': 'Soutien aux fermes et sites de transformation avec protocoles de biosécurité.',
		'home.services.c3.title': 'Opérations oléicoles',
		'home.services.c3.desc': 'Hygiène et soutien opérationnel pour les huileries et lignes d\'extraction.',
		'home.services.c4.title': 'Logistique & export',
		'home.services.c4.desc': 'Chaînes logistiques, conformité douanière et délais fiables vers nos marchés.',
		'home.services.c5.title': 'Qualité & conformité du groupe',
		'home.services.c5.desc': 'Audits, reporting et amélioration continue à l\'échelle du groupe.',
		
		// Sectors
		'sectors.title': 'Secteurs que nous <span class="accent">servons</span>',
		'sectors.c1.title': 'Fermes avicoles',
		'sectors.c1.desc': 'Programmes de biosécurité pour contrôler les agents pathogènes et la contamination croisée.',
		'sectors.c2.title': 'Huileries',
		'sectors.c2.desc': 'Élimination des résidus et des huiles tout en protégeant les environnements alimentaires.',
		'sectors.c3.title': 'Hôtels',
		'sectors.c3.desc': 'Nettoyage des arrières‑cuisines et désinfection des zones clients.',
		'sectors.c4.title': 'Sites de déchets municipaux',
		'sectors.c4.desc': 'Suppression des odeurs et décontamination pour charges élevées.',
		
		// Clients
		'clients.title': 'Nos <span class="accent">clients</span>',
		'clients.intro': 'Plébiscité par des responsables d\'exploitation dans l\'agriculture, l\'hôtellerie et les services publics.',
		
		// Why choose us
		'why.title': 'Pourquoi nous <span class="accent">choisir</span>',
		'why.b1': 'Nettoyage sans trace — rendu impeccable et tests encore meilleurs.',
		'why.b2': 'Conformité — alignée sur les réglementations locales et sectorielles.',
		'why.b3': 'Sécurité — EPI stricts et contrôles des risques.',
		'why.b4': 'Réactivité — mobilisation rapide quand vous en avez besoin.',
		'why.b5': 'Écoresponsable — réduction d\'eau et chimie responsable.',
		
		// Guarantee
		'guarantee.eyebrow': 'Garantie',
		'guarantee.title': 'Nous ne laissons aucune trace.',
		'guarantee.body': 'Notre nom est une promesse. Des charges microbiennes aux résidus visibles, nous supprimons — preuves à l\'appui.',
		'guarantee.cta': 'Nous contacter',
		
		// Insights
		'insights.eyebrow': 'Insights',
		'insights.title': 'Guides & bonnes pratiques',
		'insights.intro': 'Méthodes pratiques et vérifiables utilisées dans nos environnements industriels.',
		'insights.a1.title': 'Test ATP pour la désinfection : seuils et reporting',
		'insights.a1.desc': 'Pourquoi l\'ATP compte, comment nous échantillonnons et les plages réussite/échec visées.',
		'insights.a1.cta': 'Parler à un expert',
		'insights.a2.title': 'Contrôle des odeurs sur sites de déchets municipaux : guide pratique',
		'insights.a2.desc': 'Identification des sources, chimie de neutralisation et mesures de réduction.',
		'insights.a2.cta': 'Demander le SOP complet',
		
		// FAQ
		'faq.eyebrow': 'FAQ',
		'faq.title': 'Questions fréquentes',
		'faq.q1': 'Quels secteurs servez‑vous ?',
		'faq.a1': 'Nous accompagnons fermes avicoles, huileries, hôtels et sites de déchets municipaux avec un nettoyage axé conformité.',
		'faq.q2': 'Intervenez‑vous en urgence ?',
		'faq.a2': 'Oui. Mobilisation rapide, confinement et protocoles de désinfection.',
		'faq.q3': 'Comment demander un devis ?',
		'faq.a3': 'Utilisez le formulaire de contact ou écrivez à contact@misragroup.website avec les détails du site. Réponse sous un jour ouvré.',
		
		// Zero Trace page specific translations
		'zerotrace.meta.title': 'Zero Trace — Nettoyage & Désinfection B2B',
		'zerotrace.meta.description': 'Zero Trace propose du nettoyage en profondeur, désinfection, contrôle des odeurs et solutions écoresponsables pour secteurs industriels.',
		'zerotrace.hero.headline': 'Zero Trace — <span class="accent">Ne Laissons Aucune Trace</span> Après Notre Travail.',
		'zerotrace.hero.subhead': 'Nettoyage et désinfection B2B pour environnements industriels. Nous offrons des résultats conformes et écoresponsables qui paraissent, se ressentent et testent plus propres.',
		'zerotrace.hero.cta.primary': 'Nous contacter',
		'zerotrace.hero.cta.secondary': 'Explorer les services',
		'zerotrace.hero.badge1': 'Écoresponsable',
		'zerotrace.hero.badge2': 'Conformité d\'abord',
		'zerotrace.hero.badge3': 'Réponse rapide',
		'zerotrace.about.title': 'À propos de Zero <span class="accent">Trace</span>',
		'zerotrace.about.body': 'Nous nous spécialisons dans le nettoyage et la désinfection B2B professionnels qui répondent aux normes industrielles rigoureuses. Nos équipes sont formées pour les environnements sensibles—des fermes avicoles aux sites de déchets municipaux—offrant une désinfection mesurable, l\'élimination des résidus et le contrôle des odeurs.',
		'zerotrace.about.li1': 'Méthodes écologiques et scientifiques',
		'zerotrace.about.li2': 'Protocoles axés conformité et reporting',
		'zerotrace.about.li3': 'Équipement de qualité industrielle et EPI',
		'zerotrace.about.li4': 'Déploiement rapide et maintenance programmée',
		'zerotrace.services.title': 'Services <span class="accent">Principaux</span>',
		'zerotrace.services.intro': 'Programmes de nettoyage à fort impact conçus pour la fiabilité industrielle.',
		'zerotrace.services.c1.title': 'Désinfection & Assainissement Profonds',
		'zerotrace.services.c1.desc': 'Désinfection de niveau hospitalier et assainissement testé ATP pour zones à haut risque.',
		'zerotrace.services.c2.title': 'Dégraissage Industriel & Élimination Résidus',
		'zerotrace.services.c2.desc': 'Dégraissants lourds et nettoyage mousse pour accumulations tenaces et huiles.',
		'zerotrace.services.c3.title': 'Contrôle & Désodorisation d\'Odeurs',
		'zerotrace.services.c3.desc': 'Programmes de neutralisation ciblant les sources d\'odeurs bactériennes et organiques.',
		'zerotrace.services.c4.title': 'Élimination Déchets & Remédiation',
		'zerotrace.services.c4.desc': 'Manipulation sûre, tri et pré-traitement alignés aux réglementations.',
		'zerotrace.services.c5.title': 'Nettoyage d\'Urgence Épidémie',
		'zerotrace.services.c5.desc': 'Confinement rapide et protocoles de désinfection pour événements critiques.',
		'zerotrace.sectors.title': 'Industries que nous <span class="accent">Servons</span>',
		'zerotrace.sectors.c1.title': 'Fermes Avicoles',
		'zerotrace.sectors.c1.desc': 'Programmes de biosécurité pour contrôler agents pathogènes et contamination croisée.',
		'zerotrace.sectors.c2.title': 'Huileries',
		'zerotrace.sectors.c2.desc': 'Élimination résidus et huiles tout en protégeant environnements alimentaires.',
		'zerotrace.sectors.c3.title': 'Hôtels',
		'zerotrace.sectors.c3.desc': 'Nettoyage profond arrière-cuisine et programmes désinfection front-of-house.',
		'zerotrace.sectors.c4.title': 'Sites Déchets Municipaux',
		'zerotrace.sectors.c4.desc': 'Suppression odeurs et décontamination pour installations à charge élevée.',
		'zerotrace.clients.title': 'Nos <span class="accent">Clients</span>',
		'zerotrace.clients.intro': 'Approuvé par responsables opérationnels en agriculture, hôtellerie et travaux publics.',
		'zerotrace.why.title': 'Pourquoi nous <span class="accent">Choisir</span>',
		'zerotrace.why.b1': '<strong>Nettoyage sans trace</strong> — finition impeccable et tests encore meilleurs.',
		'zerotrace.why.b2': '<strong>Conformité</strong> — alignée aux réglementations locales et industrielles.',
		'zerotrace.why.b3': '<strong>Sécurité</strong> — EPI stricts et contrôles des dangers.',
		'zerotrace.why.b4': '<strong>Réponse rapide</strong> — mobilisation rapide quand vous en avez besoin.',
		'zerotrace.why.b5': '<strong>Écoresponsable</strong> — eau réduite, chimie responsable.',
		'zerotrace.guarantee.eyebrow': 'Garantie',
		'zerotrace.guarantee.title': 'Nous ne laissons aucune trace.',
		'zerotrace.guarantee.body': 'Notre nom est notre promesse. Des charges microbiennes aux résidus visibles, nous les éliminons—documenté.',
		'zerotrace.guarantee.cta': 'Nous contacter',
		'zerotrace.insights.eyebrow': 'Insights',
		'zerotrace.insights.title': 'Guides & Meilleures Pratiques',
		'zerotrace.insights.intro': 'Méthodes pratiques et vérifiables que nous utilisons dans les environnements industriels.',
		'zerotrace.insights.a1.title': 'Tests ATP pour Assainissement : Seuils et Reporting',
		'zerotrace.insights.a1.desc': 'Pourquoi l\'ATP compte, comment nous échantillonnons et les plages réussite/échec que nous visons dans les zones à haut risque.',
		'zerotrace.insights.a1.cta': 'Parler à un expert',
		'zerotrace.insights.a2.title': 'Contrôle Odeurs Sites Déchets Municipaux : Guide Pratique',
		'zerotrace.insights.a2.desc': 'Identification source, chimie neutralisation et métriques suppression mesurables.',
		'zerotrace.insights.a2.cta': 'Demander le SOP complet',
		'zerotrace.faq.eyebrow': 'FAQ',
		'zerotrace.faq.title': 'Questions Courantes',
		'zerotrace.faq.q1': 'Quelles industries servez-vous ?',
		'zerotrace.faq.a1': 'Nous soutenons fermes avicoles, huileries, hôtels et sites de déchets municipaux avec nettoyage axé conformité.',
		'zerotrace.faq.q2': 'Fournissez-vous nettoyage d\'urgence ?',
		'zerotrace.faq.a2': 'Oui. Nous mobilisons confinement rapide et protocoles de désinfection pour événements critiques.',
		'zerotrace.faq.q3': 'Comment pouvons-nous demander un devis ?',
		'zerotrace.faq.a3': 'Utilisez le formulaire de contact ou email contact@zerotrace.tn avec les détails de votre site. Nous répondons sous un jour ouvrable.',
		
		// Footer
		'footer.copyright': 'Misra Group. Tous droits réservés.'
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
		'contact.address': 'Sfax, Sakiet Ezzit, Túnez',
		
		// Navigation
		'nav.home': 'Inicio',
		'nav.poultry': 'Avícola',
		'nav.olive': 'Oliva',
		'nav.export': 'Exportación',
		'nav.zerotrace': 'Zero Trace',
		'nav.contact': 'Contacto',
		
		'home.meta.title': 'Misra Group — Servicios Industriales y Departamentos',
		'home.meta.description': 'Misra Group es un grupo industrial con varios departamentos. Zero Trace es nuestro brazo de recolección de residuos y servicios ambientales.',
		'home.hero.headline.html': 'Misra Group — <span class="accent">Un Grupo</span>, muchos departamentos expertos.',
		'home.hero.subhead': 'Grupo unificado que cubre limpieza y desinfección, avícola, almazaras y exportaciones — cumplimiento y respuesta rápida.',
		'home.hero.cta.primary': 'Explorar departamentos',
		'home.hero.cta.secondary': 'Sobre Misra Group',
		'home.hero.badge1': 'Multidepartamento',
		'home.hero.badge2': 'Cumplimiento primero',
		'home.hero.badge3': 'Respuesta rápida',
		'departments.title': 'Nuestros <span class="accent">Departamentos</span>',
		'departments.intro': 'Descubre las divisiones de Misra Group que atienden la industria de extremo a extremo.',
		'departments.c1.title': 'Recolección de residuos y servicios ambientales',
		'departments.c1.desc': 'Recolección, clasificación y programas ambientales para Misra y empresas externas.',
		'departments.c1.cta': 'Más información',
		'departments.c2.title': 'Avícola',
		'departments.c2.desc': 'Programas guiados por la bioseguridad para granjas y entornos de proceso.',
		'departments.c2.cta': 'Más información',
		'departments.c3.title': 'Oliva',
		'departments.c3.desc': 'Gestión de residuos y operaciones higiénicas para almazaras.',
		'departments.c3.cta': 'Más información',
		'departments.c4.title': 'Exportación',
		'departments.c4.desc': 'Servicios logísticos y de exportación con plazos fiables.',
		'departments.c4.cta': 'Más información',
		
		// About section
		'about.title.html': 'Acerca de <span class="accent">Misra Group</span>',
		'about.body': 'Misra Group es un grupo industrial multi‑departamentos con granjas y almazaras, más un departamento de exportación. Zero Trace es nuestra empresa de recolección de residuos y servicios ambientales—creada para servir las operaciones de Misra Group y ahora sirviendo también a empresas externas.',
		'about.li1': 'Métodos ecológicos y basados en ciencia',
		'about.li2': 'Protocolos de cumplimiento y reportes',
		'about.li3': 'Equipo de grado industrial y EPP',
		'about.li4': 'Despliegue rápido y mantenimiento programado',
		
		// Home services
		'home.services.title': 'Servicios del <span class="accent">Grupo</span>',
		'home.services.intro': 'Capacidades clave ofrecidas a través de los departamentos de Misra Group.',
		'home.services.c1.title': 'Servicios ambientales y recolección de residuos',
		'home.services.c1.desc': 'Programas de recolección, clasificación y mejora ambiental para nuestras sedes y socios externos.',
		'home.services.c2.title': 'Operaciones avícolas',
		'home.services.c2.desc': 'Apoyo a granjas y plantas de proceso con protocolos de bioseguridad.',
		'home.services.c3.title': 'Operaciones de aceite de oliva',
		'home.services.c3.desc': 'Higiene y apoyo operativo para almazaras y líneas de extracción.',
		'home.services.c4.title': 'Logística y exportación',
		'home.services.c4.desc': 'Cadenas logísticas, cumplimiento aduanero y plazos fiables a nuestros mercados.',
		'home.services.c5.title': 'Calidad y cumplimiento del grupo',
		'home.services.c5.desc': 'Auditorías, informes y mejora continua a nivel de grupo.',
		
		// Sectors
		'sectors.title': 'Industrias que <span class="accent">atendemos</span>',
		'sectors.c1.title': 'Granjas avícolas',
		'sectors.c1.desc': 'Programas de bioseguridad para controlar patógenos y la contaminación cruzada.',
		'sectors.c2.title': 'Almazaras',
		'sectors.c2.desc': 'Retiro de residuos y aceites protegiendo ambientes de grado alimentario.',
		'sectors.c3.title': 'Hoteles',
		'sectors.c3.desc': 'Limpieza de back‑of‑house y desinfección de áreas públicas.',
		'sectors.c4.title': 'Sitios de residuos municipales',
		'sectors.c4.desc': 'Supresión de olores y descontaminación para altas cargas.',
		
		// Clients
		'clients.title': 'Nuestros <span class="accent">clientes</span>',
		'clients.intro': 'Confiado por líderes operativos en agricultura, hotelería y obras públicas.',
		
		// Why choose us
		'why.title': 'Por qué elegir<span class="accent">nos</span>',
		'why.b1': 'Limpieza sin rastro — acabado impecable y mejores tests.',
		'why.b2': 'Cumplimiento — alineado con normativas locales e industriales.',
		'why.b3': 'Seguridad — EPP estricto y controles de riesgo.',
		'why.b4': 'Respuesta rápida — movilización cuando la necesitas.',
		'why.b5': 'Ecológico — menos agua y química responsable.',
		
		// Guarantee
		'guarantee.eyebrow': 'Garantía',
		'guarantee.title': 'No dejamos rastro.',
		'guarantee.body': 'Nuestro nombre es nuestra promesa. De cargas microbianas a residuos visibles, lo retiramos — con evidencia.',
		'guarantee.cta': 'Contáctanos',
		
		// Insights
		'insights.eyebrow': 'Insights',
		'insights.title': 'Guías y mejores prácticas',
		'insights.intro': 'Métodos prácticos y verificables que usamos en entornos industriales.',
		'insights.a1.title': 'Pruebas ATP para sanitización: umbrales e informes',
		'insights.a1.desc': 'Por qué importa ATP, cómo muestreamos y rangos de aprobado/reprobado en zonas críticas.',
		'insights.a1.cta': 'Hablar con un experto',
		'insights.a2.title': 'Control de olores en sitios de residuos municipales: guía práctica',
		'insights.a2.desc': 'Identificación de fuentes, neutralización y métricas medibles.',
		'insights.a2.cta': 'Solicitar el SOP completo',
		
		// FAQ
		'faq.eyebrow': 'FAQ',
		'faq.title': 'Preguntas frecuentes',
		'faq.q1': '¿Qué industrias atienden?',
		'faq.a1': 'Apoyamos granjas avícolas, almazaras, hoteles y sitios de residuos municipales con limpieza enfocada en cumplimiento.',
		'faq.q2': '¿Brindan limpieza de emergencia?',
		'faq.a2': 'Sí. Movilizamos contención rápida y protocolos de desinfección.',
		'faq.q3': '¿Cómo solicitamos una cotización?',
		'faq.a3': 'Usa el formulario de contacto o escribe a contact@misragroup.website con los datos del sitio. Respondemos en un día hábil.',
		
		// Zero Trace page specific translations
		'zerotrace.meta.title': 'Zero Trace — Limpieza y Sanitización B2B',
		'zerotrace.meta.description': 'Zero Trace ofrece limpieza profunda profesional B2B, desinfección, control de olores y sanitización ecológica para sectores industriales.',
		'zerotrace.hero.headline': 'Zero Trace — <span class="accent">No Dejamos Rastro</span> Después de Terminar Nuestro Trabajo.',
		'zerotrace.hero.subhead': 'Limpieza profunda y sanitización B2B para entornos industriales. Entregamos resultados listos para cumplimiento y ecológicos que se ven, sienten y prueban más limpios.',
		'zerotrace.hero.cta.primary': 'Contáctanos',
		'zerotrace.hero.cta.secondary': 'Explorar servicios',
		'zerotrace.hero.badge1': 'Ecológico',
		'zerotrace.hero.badge2': 'Cumplimiento primero',
		'zerotrace.hero.badge3': 'Respuesta rápida',
		'zerotrace.about.title': 'Acerca de Zero <span class="accent">Trace</span>',
		'zerotrace.about.body': 'Nos especializamos en limpieza y sanitización B2B profesional que cumple estándares industriales rigurosos. Nuestros equipos están entrenados para entornos sensibles—desde granjas avícolas hasta sitios de residuos municipales—entregando desinfección medible, eliminación de residuos y control de olores.',
		'zerotrace.about.li1': 'Métodos ecológicos respaldados por ciencia',
		'zerotrace.about.li2': 'Protocolos enfocados en cumplimiento y reportes',
		'zerotrace.about.li3': 'Equipo de grado industrial y EPP',
		'zerotrace.about.li4': 'Despliegue rápido y mantenimiento programado',
		'zerotrace.services.title': 'Servicios <span class="accent">Principales</span>',
		'zerotrace.services.intro': 'Programas de limpieza de alto impacto construidos para confiabilidad industrial.',
		'zerotrace.services.c1.title': 'Sanitización y Desinfección Profunda',
		'zerotrace.services.c1.desc': 'Desinfección de grado hospitalario y sanitización probada con ATP para zonas de alto riesgo.',
		'zerotrace.services.c2.title': 'Desengrase Industrial y Eliminación de Residuos',
		'zerotrace.services.c2.desc': 'Desengrasantes pesados y limpieza espumosa para acumulaciones persistentes y aceites.',
		'zerotrace.services.c3.title': 'Control de Olores y Desodorización',
		'zerotrace.services.c3.desc': 'Programas de neutralización dirigidos a fuentes de olores bacterianos y orgánicos.',
		'zerotrace.services.c4.title': 'Eliminación de Residuos y Remediación',
		'zerotrace.services.c4.desc': 'Manejo seguro, clasificación y pre-tratamiento alineados con regulaciones.',
		'zerotrace.services.c5.title': 'Limpieza de Emergencia por Brotes',
		'zerotrace.services.c5.desc': 'Contención rápida y protocolos de desinfección para eventos críticos.',
		'zerotrace.sectors.title': 'Industrias que <span class="accent">Atendemos</span>',
		'zerotrace.sectors.c1.title': 'Granjas Avícolas',
		'zerotrace.sectors.c1.desc': 'Programas de bioseguridad primero para controlar patógenos y contaminación cruzada.',
		'zerotrace.sectors.c2.title': 'Almazaras',
		'zerotrace.sectors.c2.desc': 'Eliminación de residuos y aceites mientras protegemos entornos de grado alimentario.',
		'zerotrace.sectors.c3.title': 'Hoteles',
		'zerotrace.sectors.c3.desc': 'Limpieza profunda back-of-house y horarios de desinfección front-of-house.',
		'zerotrace.sectors.c4.title': 'Sitios de Residuos Municipales',
		'zerotrace.sectors.c4.desc': 'Supresión de olores y descontaminación para instalaciones de alta carga.',
		'zerotrace.clients.title': 'Nuestros <span class="accent">Clientes</span>',
		'zerotrace.clients.intro': 'Confiado por líderes operativos en agricultura, hotelería y obras públicas.',
		'zerotrace.why.title': 'Por qué <span class="accent">Elegirnos</span>',
		'zerotrace.why.b1': '<strong>Limpieza sin rastro</strong> — acabado que se ve impecable y prueba aún mejor.',
		'zerotrace.why.b2': '<strong>Cumplimiento</strong> — alineado con regulaciones locales e industriales.',
		'zerotrace.why.b3': '<strong>Seguridad</strong> — EPP estricto y controles de peligros.',
		'zerotrace.why.b4': '<strong>Respuesta rápida</strong> — movilización rápida cuando lo necesitas.',
		'zerotrace.why.b5': '<strong>Ecológico</strong> — agua reducida, química responsable.',
		'zerotrace.guarantee.eyebrow': 'Garantía',
		'zerotrace.guarantee.title': 'No dejamos rastro.',
		'zerotrace.guarantee.body': 'Nuestro nombre es nuestra promesa. De cargas microbianas a residuos visibles, lo eliminamos—documentado.',
		'zerotrace.guarantee.cta': 'Contáctanos',
		'zerotrace.insights.eyebrow': 'Insights',
		'zerotrace.insights.title': 'Guías y Mejores Prácticas',
		'zerotrace.insights.intro': 'Métodos prácticos y verificables que usamos en entornos industriales.',
		'zerotrace.insights.a1.title': 'Pruebas ATP para Sanitización: Umbrales y Reportes',
		'zerotrace.insights.a1.desc': 'Por qué importa ATP, cómo muestreamos y los rangos de aprobado/reprobado que buscamos en zonas de alto riesgo.',
		'zerotrace.insights.a1.cta': 'Hablar con un experto',
		'zerotrace.insights.a2.title': 'Control de Olores en Sitios de Residuos Municipales: Guía Práctica',
		'zerotrace.insights.a2.desc': 'Identificación de fuente, química de neutralización y métricas de supresión medibles.',
		'zerotrace.insights.a2.cta': 'Solicitar el SOP completo',
		'zerotrace.faq.eyebrow': 'FAQ',
		'zerotrace.faq.title': 'Preguntas Comunes',
		'zerotrace.faq.q1': '¿Qué industrias atienden?',
		'zerotrace.faq.a1': 'Apoyamos granjas avícolas, almazaras, hoteles y sitios de residuos municipales con limpieza enfocada en cumplimiento.',
		'zerotrace.faq.q2': '¿Proporcionan limpieza de emergencia?',
		'zerotrace.faq.a2': 'Sí. Movilizamos contención rápida y protocolos de desinfección para eventos críticos.',
		'zerotrace.faq.q3': '¿Cómo podemos solicitar una cotización?',
		'zerotrace.faq.a3': 'Usa el formulario de contacto o email contact@zerotrace.tn con los detalles de tu sitio. Respondemos dentro de un día hábil.',
		
		// Footer
		'footer.copyright': 'Misra Group. Todos los derechos reservados.'
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
		'contact.address': 'Sfax, Sakiet Ezzit, Tunesien',
		
		// Navigation
		'nav.home': 'Startseite',
		'nav.poultry': 'Geflügel',
		'nav.olive': 'Olivenöl',
		'nav.export': 'Export',
		'nav.zerotrace': 'Zero Trace',
		'nav.contact': 'Kontakt',
		
		'home.meta.title': 'Misra Group — Industrielle Services & Bereiche',
		'home.meta.description': 'Misra Group ist ein Konzern mit mehreren Bereichen. Zero Trace ist unser Bereich für Abfallsammlung und Umweltservices.',
		'home.hero.headline.html': 'Misra Group — <span class="accent">Ein Konzern</span>, viele Fachbereiche.',
		'home.hero.subhead': 'Einheitlicher Konzern für Reinigung & Desinfektion, Geflügel, Olivenöl‑Pressen und Export — Compliance und schnelle Reaktion.',
		'home.hero.cta.primary': 'Bereiche entdecken',
		'home.hero.cta.secondary': 'Über Misra Group',
		'home.hero.badge1': 'Mehrere Bereiche',
		'home.hero.badge2': 'Compliance‑first',
		'home.hero.badge3': 'Schnelle Reaktion',
		'departments.title': 'Unsere <span class="accent">Bereiche</span>',
		'departments.intro': 'Entdecken Sie die Divisionen der Misra Group für durchgängige Industrie‑Services.',
		'departments.c1.title': 'Abfallsammlung & Umweltservices',
		'departments.c1.desc': 'Sammlung, Sortierung und Umweltprogramme für Misra und externe Unternehmen.',
		'departments.c1.cta': 'Mehr erfahren',
		'departments.c2.title': 'Geflügel',
		'departments.c2.desc': 'Biosicherheits‑Programme für Betriebe und Verarbeitung.',
		'departments.c2.cta': 'Mehr erfahren',
		'departments.c3.title': 'Olivenöl',
		'departments.c3.desc': 'Rückstandsmanagement und Hygiene für Olivenölpressen.',
		'departments.c3.cta': 'Mehr erfahren',
		'departments.c4.title': 'Export',
		'departments.c4.desc': 'Logistik‑ und Exportservices mit verlässlichen Zeitplänen.',
		'departments.c4.cta': 'Mehr erfahren',
		
		// About section
		'about.title.html': 'Über <span class="accent">Misra Group</span>',
		'about.body': 'Misra Group ist ein mehrteiliger Industriekonzern mit Betrieben und Olivenöl‑Pressen, plus einer Export‑Abteilung. Zero Trace ist unser Abfallsammlungs‑ und Umweltservice‑Unternehmen—geschaffen für Misra Group Operationen und jetzt auch für externe Unternehmen tätig.',
		'about.li1': 'Umweltfreundliche, wissenschaftlich fundierte Methoden',
		'about.li2': 'Compliance‑Protokolle und Reporting',
		'about.li3': 'Industrieausrüstung und PSA',
		'about.li4': 'Schneller Einsatz und geplante Wartung',
		
		// Home services
		'home.services.title': 'Konzern‑<span class="accent">Services</span>',
		'home.services.intro': 'Zentrale Leistungen über die Bereiche der Misra Group hinweg.',
		'home.services.c1.title': 'Umweltservices & Abfallsammlung',
		'home.services.c1.desc': 'Programme zur Sammlung, Sortierung und Umweltverbesserung für unsere Standorte und externe Partner.',
		'home.services.c2.title': 'Geflügel‑Operationen',
		'home.services.c2.desc': 'Unterstützung für Betriebe und Verarbeitung mit Biosicherheits‑Protokollen.',
		'home.services.c3.title': 'Olivenöl‑Operationen',
		'home.services.c3.desc': 'Hygiene und operative Unterstützung für Pressen und Extraktionslinien.',
		'home.services.c4.title': 'Logistik & Export',
		'home.services.c4.desc': 'Logistikketten, Zoll‑Compliance und verlässliche Laufzeiten in unsere Märkte.',
		'home.services.c5.title': 'Qualität & Compliance im Konzern',
		'home.services.c5.desc': 'Audits, Reporting und kontinuierliche Verbesserung auf Gruppenebene.',
		
		// Sectors
		'sectors.title': 'Branchen, die wir <span class="accent">bedienen</span>',
		'sectors.c1.title': 'Geflügelbetriebe',
		'sectors.c1.desc': 'Biosicherheits‑Programme zur Kontrolle von Erregern und Kreuzkontamination.',
		'sectors.c2.title': 'Olivenöl‑Pressen',
		'sectors.c2.desc': 'Entfernung von Rückständen und Ölen bei Schutz von Lebensmittelbereichen.',
		'sectors.c3.title': 'Hotels',
		'sectors.c3.desc': 'Tiefenreinigung Back‑of‑House und Desinfektion Front‑of‑House.',
		'sectors.c4.title': 'Kommunale Abfallstandorte',
		'sectors.c4.desc': 'Geruchsminderung und Dekontamination für hohe Belastungen.',
		
		// Clients
		'clients.title': 'Unsere <span class="accent">Kunden</span>',
		'clients.intro': 'Vertraut von Betriebsleitern in Landwirtschaft, Hotellerie und öffentlicher Hand.',
		
		// Why choose us
		'why.title': 'Warum <span class="accent">wir</span>',
		'why.b1': 'Spurloses Reinigen — makelloses Ergebnis, noch bessere Tests.',
		'why.b2': 'Compliance — im Einklang mit lokalen und Branchen‑Vorgaben.',
		'why.b3': 'Sicherheit — strikte PSA und Gefahrenkontrollen.',
		'why.b4': 'Schnelle Reaktion — rasche Mobilisierung bei Bedarf.',
		'why.b5': 'Umweltbewusst — weniger Wasser, verantwortliche Chemie.',
		
		// Guarantee
		'guarantee.eyebrow': 'Garantie',
		'guarantee.title': 'Wir hinterlassen keine Spuren.',
		'guarantee.body': 'Unser Name ist unser Versprechen. Von mikrobieller Last bis sichtbaren Rückständen – wir entfernen alles, belegt.',
		'guarantee.cta': 'Kontakt',
		
		// Insights
		'insights.eyebrow': 'Insights',
		'insights.title': 'Leitfäden & Best Practices',
		'insights.intro': 'Praktische, überprüfbare Methoden aus Industrieumgebungen.',
		'insights.a1.title': 'ATP‑Tests für Sanitization: Schwellen und Reporting',
		'insights.a1.desc': 'Warum ATP wichtig ist, wie wir Proben nehmen und Zielbereiche bestehen/nicht bestehen.',
		'insights.a1.cta': 'Mit Experten sprechen',
		'insights.a2.title': 'Geruchskontrolle an kommunalen Abfallstandorten: Praxisleitfaden',
		'insights.a2.desc': 'Quellidentifikation, Neutralisations‑Chemie und messbare Dämpfung.',
		'insights.a2.cta': 'Vollständiges SOP anfordern',
		
		// FAQ
		'faq.eyebrow': 'FAQ',
		'faq.title': 'Häufige Fragen',
		'faq.q1': 'Welche Branchen bedienen Sie?',
		'faq.a1': 'Wir unterstützen Geflügelhöfe, Olivenöl‑Pressen, Hotels und kommunale Abfallstandorte mit Compliance‑orientierter Reinigung.',
		'faq.q2': 'Bieten Sie Notfall‑Reinigung?',
		'faq.a2': 'Ja. Schnelle Eindämmung und Desinfektions‑Protokolle.',
		'faq.q3': 'Wie fordern wir ein Angebot an?',
		'faq.a3': 'Nutzen Sie das Kontaktformular oder schreiben Sie an contact@misragroup.website mit Ihren Standort‑Details. Antwort innerhalb eines Werktags.',
		
		// Zero Trace page specific translations
		'zerotrace.meta.title': 'Zero Trace — B2B Reinigung & Sanitization',
		'zerotrace.meta.description': 'Zero Trace bietet professionelle B2B Tiefenreinigung, Desinfektion, Geruchskontrolle und umweltbewusste Sanitization für Industriesektoren.',
		'zerotrace.hero.headline': 'Zero Trace — <span class="accent">Hinterlassen Keine Spuren</span> Nach Getaner Arbeit.',
		'zerotrace.hero.subhead': 'B2B Tiefenreinigung und Sanitization für Industrieumgebungen. Wir liefern compliance‑bereite, umweltbewusste Ergebnisse die aussehen, sich anfühlen und besser testen.',
		'zerotrace.hero.cta.primary': 'Kontakt',
		'zerotrace.hero.cta.secondary': 'Services erkunden',
		'zerotrace.hero.badge1': 'Umweltbewusst',
		'zerotrace.hero.badge2': 'Compliance‑first',
		'zerotrace.hero.badge3': 'Schnelle Antwort',
		'zerotrace.about.title': 'Über Zero <span class="accent">Trace</span>',
		'zerotrace.about.body': 'Wir spezialisieren uns auf professionelle B2B Reinigung und Sanitization die rigorose Industriestandards erfüllt. Unsere Teams sind für sensible Umgebungen trainiert—von Geflügelbetrieben bis kommunalen Abfallstandorten—und liefern messbare Desinfektion, Rückstandsentfernung und Geruchskontrolle.',
		'zerotrace.about.li1': 'Umweltfreundliche, wissenschaftlich fundierte Methoden',
		'zerotrace.about.li2': 'Compliance‑fokussierte Protokolle und Reporting',
		'zerotrace.about.li3': 'Industrietaugliche Ausrüstung und PSA',
		'zerotrace.about.li4': 'Schneller Einsatz und geplante Wartung',
		'zerotrace.services.title': 'Kern‑<span class="accent">Services</span>',
		'zerotrace.services.intro': 'Hochimpakt Reinigungsprogramme für industrielle Zuverlässigkeit gebaut.',
		'zerotrace.services.c1.title': 'Tiefe Sanitization & Desinfektion',
		'zerotrace.services.c1.desc': 'Krankenhaus‑Level Desinfektion und ATP‑getestete Sanitization für Hochrisikozonen.',
		'zerotrace.services.c2.title': 'Industrielles Entfetten & Rückstandsentfernung',
		'zerotrace.services.c2.desc': 'Heavy‑duty Entfetter und Schaumreinigung für hartnäckige Ablagerungen und Öle.',
		'zerotrace.services.c3.title': 'Geruchskontrolle & Desodorierung',
		'zerotrace.services.c3.desc': 'Neutralisationsprogramme die bakterielle und organische Geruchsquellen anvisieren.',
		'zerotrace.services.c4.title': 'Abfallentfernung & Sanierung',
		'zerotrace.services.c4.desc': 'Sichere Handhabung, Sortierung und Vorbehandlung im Einklang mit Vorschriften.',
		'zerotrace.services.c5.title': 'Notfall‑Ausbruchs‑Reinigung',
		'zerotrace.services.c5.desc': 'Schnelle Eindämmung und Desinfektionsprotokolle für kritische Ereignisse.',
		'zerotrace.sectors.title': 'Branchen die wir <span class="accent">bedienen</span>',
		'zerotrace.sectors.c1.title': 'Geflügelbetriebe',
		'zerotrace.sectors.c1.desc': 'Biosicherheits‑first Programme zur Kontrolle von Krankheitserregern und Kreuzkontamination.',
		'zerotrace.sectors.c2.title': 'Olivenöl‑Pressen',
		'zerotrace.sectors.c2.desc': 'Rückstands‑ und Ölentfernung während Schutz von lebensmitteltauglichen Umgebungen.',
		'zerotrace.sectors.c3.title': 'Hotels',
		'zerotrace.sectors.c3.desc': 'Back‑of‑house Tiefenreinigung und Front‑of‑house Desinfektionspläne.',
		'zerotrace.sectors.c4.title': 'Kommunale Abfallstandorte',
		'zerotrace.sectors.c4.desc': 'Geruchsunterdrückung und Dekontamination für Hochlast‑Anlagen.',
		'zerotrace.clients.title': 'Unsere <span class="accent">Kunden</span>',
		'zerotrace.clients.intro': 'Vertraut von Betriebsleitern in Landwirtschaft, Hotellerie und öffentlichen Arbeiten.',
		'zerotrace.why.title': 'Warum <span class="accent">uns wählen</span>',
		'zerotrace.why.b1': '<strong>Spurlose Reinigung</strong> — Finish das makellos aussieht und noch besser testet.',
		'zerotrace.why.b2': '<strong>Compliance</strong> — ausgerichtet auf lokale und Industrievorschriften.',
		'zerotrace.why.b3': '<strong>Sicherheit</strong> — strikte PSA und Gefahrenkontrollen.',
		'zerotrace.why.b4': '<strong>Schnelle Reaktion</strong> — rasche Mobilisierung wenn Sie es brauchen.',
		'zerotrace.why.b5': '<strong>Umweltbewusst</strong> — reduziertes Wasser, verantwortliche Chemie.',
		'zerotrace.guarantee.eyebrow': 'Garantie',
		'zerotrace.guarantee.title': 'Wir hinterlassen keine Spuren.',
		'zerotrace.guarantee.body': 'Unser Name ist unser Versprechen. Von mikrobiellen Lasten bis sichtbaren Rückständen, wir entfernen es—dokumentiert.',
		'zerotrace.guarantee.cta': 'Kontakt',
		'zerotrace.insights.eyebrow': 'Insights',
		'zerotrace.insights.title': 'Leitfäden & Best Practices',
		'zerotrace.insights.intro': 'Praktische, überprüfbare Methoden die wir in Industrieumgebungen verwenden.',
		'zerotrace.insights.a1.title': 'ATP‑Tests für Sanitization: Schwellenwerte und Reporting',
		'zerotrace.insights.a1.desc': 'Warum ATP wichtig ist, wie wir Proben nehmen und die Bestanden/Durchgefallen‑Bereiche die wir in Hochrisikozonen anstreben.',
		'zerotrace.insights.a1.cta': 'Mit einem Experten sprechen',
		'zerotrace.insights.a2.title': 'Geruchskontrolle in kommunalen Abfallstandorten: Praktischer Leitfaden',
		'zerotrace.insights.a2.desc': 'Quellidentifikation, Neutralisationschemie und messbare Unterdrückungsmetriken.',
		'zerotrace.insights.a2.cta': 'Vollständiges SOP anfordern',
		'zerotrace.faq.eyebrow': 'FAQ',
		'zerotrace.faq.title': 'Häufige Fragen',
		'zerotrace.faq.q1': 'Welche Branchen bedienen Sie?',
		'zerotrace.faq.a1': 'Wir unterstützen Geflügelbetriebe, Olivenöl‑Pressen, Hotels und kommunale Abfallstandorte mit compliance‑fokussierter Reinigung.',
		'zerotrace.faq.q2': 'Bieten Sie Notfallreinigung?',
		'zerotrace.faq.a2': 'Ja. Wir mobilisieren schnelle Eindämmung und Desinfektionsprotokolle für kritische Ereignisse.',
		'zerotrace.faq.q3': 'Wie können wir ein Angebot anfordern?',
		'zerotrace.faq.a3': 'Nutzen Sie das Kontaktformular oder email contact@zerotrace.tn mit Ihren Standortdetails. Wir antworten innerhalb eines Werktags.',
		
		// Footer
		'footer.copyright': 'Misra Group. Alle Rechte vorbehalten.'
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
		'contact.error.rate': 'يمكنك إرسال طلب واحد فقط كل ساعة. يرجى المحاولة لاحقًا.',
		'contact.address': 'صفاقس، ساقية الزيت، تونس',
		'home.meta.title': 'مجموعة ميسرا — خدمات صناعية وأقسام',
		'home.meta.description': 'مجموعة ميسرا كيان متعدد الأقسام. زيرو تريس هو ذراعنا لجمع النفايات والخدمات البيئية.',
		'home.hero.headline.html': 'مجموعة ميسرا — <span class="accent">مجموعة واحدة</span>، أقسام خبيرة متعددة.',
		'home.hero.subhead': 'مجموعة موحدة تغطي التنظيف والتعقيم، الدواجن، معاصر الزيتون والتصدير — امتثال قابل للقياس واستجابة سريعة.',
		'home.hero.cta.primary': 'استكشف الأقسام',
		'home.hero.cta.secondary': 'عن مجموعة ميسرا',
		'home.hero.badge1': 'متعددة الأقسام',
		'home.hero.badge2': 'الامتثال أولًا',
		'home.hero.badge3': 'استجابة سريعة',
		'departments.title': 'أقسام <span class="accent">المجموعة</span>',
		'departments.intro': 'استكشف أقسام مجموعة ميسرا التي تخدم الصناعة من البداية للنهاية.',
		'departments.c1.title': 'جمع النفايات والخدمات البيئية',
		'departments.c1.desc': 'جمع وفرز وبرامج بيئية لمواقع مجموعة ميسرا وشركات خارجية.',
		'departments.c1.cta': 'اعرف المزيد',
		'departments.c2.title': 'الدواجن',
		'departments.c2.desc': 'برامج تعتمد السلامة الحيوية للمزارع وبيئات المعالجة.',
		'departments.c2.cta': 'اعرف المزيد',
		'departments.c3.title': 'الزيتون',
		'departments.c3.desc': 'إدارة الرواسب وتشغيل صحي لمعاصر الزيتون.',
		'departments.c3.cta': 'اعرف المزيد',
		'departments.c4.title': 'التصدير',
		'departments.c4.desc': 'خدمات لوجستية وتصدير بمواعيد موثوقة.',
		'departments.c4.cta': 'اعرف المزيد',
		
		// Navigation
		'nav.home': 'الرئيسية',
		'nav.poultry': 'الدواجن',
		'nav.olive': 'الزيتون',
		'nav.export': 'التصدير',
		'nav.zerotrace': 'زيرو تريس',
		'nav.contact': 'اتصل بنا',
		
		// About section
		'about.title.html': 'نبذة عن <span class="accent">مجموعة ميسرا</span>',
		'about.body': 'مجموعة ميسرا كيان صناعي متعدد الأقسام يضم مزارع ومعاصر زيتون وقسم تصدير. زيرو تريس هي شركة جمع نفايات وخدمات بيئية تابعة للمجموعة — أُنشئت لخدمة أقسام ميسرا والآن تخدم شركات خارجية أيضًا.',
		'about.li1': 'أساليب صديقة للبيئة مدعومة بالعلم',
		'about.li2': 'بروتوكولات امتثال وتقارير',
		'about.li3': 'معدات وتجهيزات صناعية',
		'about.li4': 'استجابة سريعة وجدولة صيانة',
		
		// Home services
		'home.services.title': 'خدمات <span class="accent">المجموعة</span>',
		'home.services.intro': 'قدرات أساسية تُقدَّم عبر أقسام مجموعة ميسرا.',
		'home.services.c1.title': 'الخدمات البيئية وجمع النفايات',
		'home.services.c1.desc': 'برامج جمع وفرز وتحسين بيئي لمواقعنا وشركائنا.',
		'home.services.c2.title': 'عمليات الدواجن',
		'home.services.c2.desc': 'دعم المزارع ومواقع المعالجة ببروتوكولات الأمن الحيوي.',
		'home.services.c3.title': 'عمليات الزيتون',
		'home.services.c3.desc': 'نظافة ودعم تشغيلي لمعاصر الزيتون وخطوط الاستخلاص.',
		'home.services.c4.title': 'اللوجستيات والتصدير',
		'home.services.c4.desc': 'سلاسل لوجستية، امتثال جمركي ومواعيد موثوقة لأسواقنا.',
		'home.services.c5.title': 'الجودة والامتثال على مستوى المجموعة',
		'home.services.c5.desc': 'مراجعات وتقارير وتحسين مستمر على نطاق المجموعة.',
		
		// Sectors
		'sectors.title': 'القطاعات <span class="accent">التي نخدمها</span>',
		'sectors.c1.title': 'مزارع الدواجن',
		'sectors.c1.desc': 'برامج أمان حيوي للحد من الممرضات ومنع انتقالها.',
		'sectors.c2.title': 'معاصر الزيتون',
		'sectors.c2.desc': 'إزالة الرواسب والزيوت مع حماية بيئات الغذاء.',
		'sectors.c3.title': 'الفنادق',
		'sectors.c3.desc': 'تنظيف مناطق الخدمات وتعقيم الواجهة وفق جداول.',
		'sectors.c4.title': 'مواقع النفايات البلدية',
		'sectors.c4.desc': 'كبح الروائح وإزالة التلوث للمنشآت ذات الأحمال العالية.',
		
		// Clients
		'clients.title': 'عملاؤنا',
		'clients.intro': 'موثوق من قادة التشغيل في الزراعة والضيافة والأشغال العامة.',
		
		// Why choose us
		'why.title': 'لماذا <span class="accent">نحن</span>',
		'why.b1': 'تنظيف بلا أثر — مظهر مثالي ونتائج مُثبتة.',
		'why.b2': 'امتثال — متوافق مع اللوائح المحلية والصناعية.',
		'why.b3': 'سلامة — تجهيزات وقاية وإجراءات مخاطر صارمة.',
		'why.b4': 'استجابة سريعة — تعبئة فورية عند الحاجة.',
		'why.b5': 'صديق للبيئة — ترشيد الماء وكيمياء مسؤولة.',
		
		// Guarantee
		'guarantee.eyebrow': 'ضمان',
		'guarantee.title': 'لا نترك أثراً.',
		'guarantee.body': 'اسمنا وعدنا. من الأحمال الميكروبية إلى الرواسب المرئية، نزيلها — مع توثيق النتائج.',
		'guarantee.cta': 'اتصل بنا',
		
		// Insights
		'insights.eyebrow': 'رؤى',
		'insights.title': 'أدلة وأفضل الممارسات',
		'insights.intro': 'أساليب عملية قابلة للتحقق نستخدمها عبر البيئات الصناعية.',
		'insights.a1.title': 'اختبار ATP للتعقيم: الحدود والتقارير',
		'insights.a1.desc': 'لماذا يهم ATP وكيف نأخذ العينات ونطاقات النجاح/الفشل في المناطق عالية الخطورة.',
		'insights.a1.cta': 'تحدث إلى خبير',
		'insights.a2.title': 'التحكم بالروائح في مواقع النفايات البلدية: دليل عملي',
		'insights.a2.desc': 'تحديد المصدر وكيمياء التحييد ومقاييس الكبح القابلة للقياس.',
		'insights.a2.cta': 'اطلب إجراءات التشغيل القياسية الكاملة',
		
		// FAQ
		'faq.eyebrow': 'الأسئلة الشائعة',
		'faq.title': 'أسئلة شائعة',
		'faq.q1': 'ما القطاعات التي تخدمونها؟',
		'faq.a1': 'ندعم مزارع الدواجن ومعاصر الزيتون والفنادق ومواقع النفايات البلدية بتنظيف يركز على الامتثال.',
		'faq.q2': 'هل تقدمون تنظيف الطوارئ؟',
		'faq.a2': 'نعم، نقوم بتعبئة احتواء سريع وبروتوكولات تعقيم للأحداث الحرجة.',
		'faq.q3': 'كيف نطلب عرض سعر؟',
		'faq.a3': 'استخدم نموذج الاتصال أو أرسل بريدًا إلى contact@misragroup.website مع تفاصيل موقعك. نرد خلال يوم عمل.',
		
		// Zero Trace page specific translations
		'zerotrace.meta.title': 'زيرو تريس — تنظيف وتعقيم B2B',
		'zerotrace.meta.description': 'زيرو تريس تقدم تنظيف عميق احترافي B2B، تطهير، مكافحة الروائح وتعقيم صديق للبيئة للقطاعات الصناعية.',
		'zerotrace.hero.headline': 'زيرو تريس — <span class="accent">لا نترك أثراً</span> بعد انتهاء عملنا.',
		'zerotrace.hero.subhead': 'تنظيف عميق وتعقيم B2B للبيئات الصناعية. نقدم نتائج جاهزة للامتثال وصديقة للبيئة تبدو وتشعر وتختبر أنظف.',
		'zerotrace.hero.cta.primary': 'اتصل بنا',
		'zerotrace.hero.cta.secondary': 'استكشف الخدمات',
		'zerotrace.hero.badge1': 'صديق للبيئة',
		'zerotrace.hero.badge2': 'الامتثال أولاً',
		'zerotrace.hero.badge3': 'استجابة سريعة',
		'zerotrace.about.title': 'حول <span class="accent">زيرو تريس</span>',
		'zerotrace.about.body': 'نتخصص في التنظيف والتعقيم B2B المهني الذي يلبي المعايير الصناعية الصارمة. فرقنا مدربة للبيئات الحساسة—من مزارع الدواجن إلى مواقع النفايات البلدية—وتقدم تطهير قابل للقياس وإزالة المخلفات ومكافحة الروائح.',
		'zerotrace.about.li1': 'طرق صديقة للبيئة مدعومة بالعلم',
		'zerotrace.about.li2': 'بروتوكولات مركزة على الامتثال والتقارير',
		'zerotrace.about.li3': 'معدات درجة صناعية و معدات الحماية الشخصية',
		'zerotrace.about.li4': 'نشر سريع وصيانة مجدولة',
		'zerotrace.services.title': 'الخدمات <span class="accent">الأساسية</span>',
		'zerotrace.services.intro': 'برامج تنظيف عالية التأثير مبنية للموثوقية الصناعية.',
		'zerotrace.services.c1.title': 'تعقيم وتطهير عميق',
		'zerotrace.services.c1.desc': 'تطهير بدرجة المستشفيات وتعقيم مختبر ATP للمناطق عالية الخطورة.',
		'zerotrace.services.c2.title': 'إزالة الشحوم الصناعية والمخلفات',
		'zerotrace.services.c2.desc': 'مزيلات الشحوم الثقيلة والتنظيف بالرغوة للتراكمات العنيدة والزيوت.',
		'zerotrace.services.c3.title': 'مكافحة الروائح وإزالة الروائح',
		'zerotrace.services.c3.desc': 'برامج تحييد تستهدف مصادر الروائح البكتيرية والعضوية.',
		'zerotrace.services.c4.title': 'إزالة النفايات والمعالجة',
		'zerotrace.services.c4.desc': 'التعامل الآمن والفرز والمعالجة المسبقة متوافقة مع اللوائح.',
		'zerotrace.services.c5.title': 'تنظيف طوارئ الفاشيات',
		'zerotrace.services.c5.desc': 'احتواء سريع وبروتوكولات تطهير للأحداث الحرجة.',
		'zerotrace.sectors.title': 'الصناعات التي <span class="accent">نخدمها</span>',
		'zerotrace.sectors.c1.title': 'مزارع الدواجن',
		'zerotrace.sectors.c1.desc': 'برامج أمان حيوي أولاً للسيطرة على الممرضات والتلوث المتبادل.',
		'zerotrace.sectors.c2.title': 'معاصر الزيتون',
		'zerotrace.sectors.c2.desc': 'إزالة المخلفات والزيوت مع حماية البيئات الغذائية.',
		'zerotrace.sectors.c3.title': 'الفنادق',
		'zerotrace.sectors.c3.desc': 'تنظيف عميق للمناطق الخلفية وجداول تطهير المناطق الأمامية.',
		'zerotrace.sectors.c4.title': 'مواقع النفايات البلدية',
		'zerotrace.sectors.c4.desc': 'قمع الروائح وإزالة التلوث للمرافق عالية الحمولة.',
		'zerotrace.clients.title': 'عملاؤنا',
		'zerotrace.clients.intro': 'موثوق من قادة العمليات في الزراعة والضيافة والأشغال العامة.',
		'zerotrace.why.title': 'لماذا <span class="accent">تختارنا</span>',
		'zerotrace.why.b1': '<strong>تنظيف بلا أثر</strong> — لمسة نهائية تبدو مثالية وتختبر أفضل.',
		'zerotrace.why.b2': '<strong>الامتثال</strong> — متوافق مع اللوائح المحلية والصناعية.',
		'zerotrace.why.b3': '<strong>السلامة</strong> — معدات حماية صارمة ومراقبة المخاطر.',
		'zerotrace.why.b4': '<strong>استجابة سريعة</strong> — تعبئة سريعة عند الحاجة.',
		'zerotrace.why.b5': '<strong>صديق للبيئة</strong> — مياه مقللة وكيمياء مسؤولة.',
		'zerotrace.guarantee.eyebrow': 'ضمان',
		'zerotrace.guarantee.title': 'لا نترك أثراً.',
		'zerotrace.guarantee.body': 'اسمنا وعدنا. من الأحمال الميكروبية إلى المخلفات المرئية، نزيلها—موثق.',
		'zerotrace.guarantee.cta': 'اتصل بنا',
		'zerotrace.insights.eyebrow': 'رؤى',
		'zerotrace.insights.title': 'أدلة وأفضل الممارسات',
		'zerotrace.insights.intro': 'طرق عملية وقابلة للتحقق نستخدمها في البيئات الصناعية.',
		'zerotrace.insights.a1.title': 'اختبار ATP للتعقيم: العتبات والتقارير',
		'zerotrace.insights.a1.desc': 'لماذا يهم ATP، كيف نأخذ العينات ونطاقات النجاح/الفشل التي نستهدفها في المناطق عالية الخطورة.',
		'zerotrace.insights.a1.cta': 'تحدث إلى خبير',
		'zerotrace.insights.a2.title': 'مكافحة الروائح في مواقع النفايات البلدية: دليل عملي',
		'zerotrace.insights.a2.desc': 'تحديد المصدر وكيمياء التحييد ومقاييس القمع القابلة للقياس.',
		'zerotrace.insights.a2.cta': 'اطلب إجراءات التشغيل القياسية الكاملة',
		'zerotrace.faq.eyebrow': 'الأسئلة الشائعة',
		'zerotrace.faq.title': 'أسئلة شائعة',
		'zerotrace.faq.q1': 'ما الصناعات التي تخدمونها؟',
		'zerotrace.faq.a1': 'ندعم مزارع الدواجن ومعاصر الزيتون والفنادق ومواقع النفايات البلدية بتنظيف مركز على الامتثال.',
		'zerotrace.faq.q2': 'هل تقدمون تنظيف طوارئ؟',
		'zerotrace.faq.a2': 'نعم. نعبئ احتواء سريع وبروتوكولات تطهير للأحداث الحرجة.',
		'zerotrace.faq.q3': 'كيف يمكننا طلب عرض سعر؟',
		'zerotrace.faq.a3': 'استخدم نموذج الاتصال أو أرسل بريدًا إلى contact@zerotrace.tn مع تفاصيل موقعك. نرد خلال يوم عمل واحد.',
		
		// Footer
		'footer.copyright': 'مجموعة ميسرا. جميع الحقوق محفوظة.'
	}
};

// Make i18n globally available
window.i18n = i18n;

// =============================================================================
// GLOBAL VARIABLES & UTILITIES
// =============================================================================

let currentLang = 'en';
let currentTheme = 'dark';

// Utility functions
function safeLocalStorage(action, key, value = null) {
  try {
    if (action === 'get') return localStorage.getItem(key);
    if (action === 'set') return localStorage.setItem(key, value);
    if (action === 'remove') return localStorage.removeItem(key);
  } catch (e) {
    console.warn('LocalStorage error:', e);
    return action === 'get' ? null : false;
  }
}

function getStoredLang() {
  return safeLocalStorage('get', 'site_lang') || 'en';
}

function getStoredTheme() {
  return safeLocalStorage('get', 'theme') || 'dark';
}

// =============================================================================
// TRANSLATION SYSTEM
// =============================================================================

function getTranslations(lang) {
  try {
    return window.i18n && window.i18n[lang] ? window.i18n[lang] : window.i18n?.en || {};
  } catch (e) {
    console.warn('Translation error:', e);
    return {};
  }
}

function getCurrentPage() {
  // Get page class from body element
  const body = document.body;
  const classList = body.classList;
  
  // Find class that starts with 'page-'
  for (let className of classList) {
    if (className.startsWith('page-')) {
      return className.replace('page-', '');
    }
  }
  
  // Fallback: detect from URL
  const path = window.location.pathname;
  const filename = path.split('/').pop().replace('.html', '') || 'index';
  return filename;
}

function applyTranslations(lang) {
  console.log('🔄 Applying translations for:', lang);
  
  // Detect current page from body class
  const currentPage = getCurrentPage();
  console.log('📄 Current page:', currentPage);
  
  const translations = getTranslations(lang);
  if (!translations || Object.keys(translations).length === 0) {
    console.warn('❌ No translations found for:', lang);
    return;
  }

  // Apply data-i18n attributes
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (translations[key]) {
      el.textContent = translations[key];
    }
  });

  // Apply data-i18n-html attributes
  document.querySelectorAll('[data-i18n-html]').forEach(el => {
    const key = el.getAttribute('data-i18n-html');
    if (translations[key]) {
      el.innerHTML = translations[key];
    }
  });

  // Translate navigation links
  const navLinks = document.querySelectorAll('.new-nav-link');
  const navKeys = ['nav.home', 'nav.poultry', 'nav.olive', 'nav.export', 'nav.zerotrace', 'nav.contact'];
  navLinks.forEach((link, index) => {
    if (translations[navKeys[index]]) {
      link.textContent = translations[navKeys[index]];
    }
  });

  // Translate sections without data-i18n attributes (page-specific)
  const sectionTranslations = [
    // Departments section cards (only on index page)
    { selector: '#departments .cards article:nth-child(1) h3', key: 'departments.c1.title', page: 'index' },
    { selector: '#departments .cards article:nth-child(1) p', key: 'departments.c1.desc', page: 'index' },
    { selector: '#departments .cards article:nth-child(1) .btn', key: 'departments.c1.cta', page: 'index' },
    { selector: '#departments .cards article:nth-child(2) h3', key: 'departments.c2.title', page: 'index' },
    { selector: '#departments .cards article:nth-child(2) p', key: 'departments.c2.desc', page: 'index' },
    { selector: '#departments .cards article:nth-child(2) .btn', key: 'departments.c2.cta', page: 'index' },
    { selector: '#departments .cards article:nth-child(3) h3', key: 'departments.c3.title', page: 'index' },
    { selector: '#departments .cards article:nth-child(3) p', key: 'departments.c3.desc', page: 'index' },
    { selector: '#departments .cards article:nth-child(3) .btn', key: 'departments.c3.cta', page: 'index' },
    { selector: '#departments .cards article:nth-child(4) h3', key: 'departments.c4.title', page: 'index' },
    { selector: '#departments .cards article:nth-child(4) p', key: 'departments.c4.desc', page: 'index' },
    { selector: '#departments .cards article:nth-child(4) .btn', key: 'departments.c4.cta', page: 'index' },
    
    // About section (only on index page)
    { selector: '#about h2', key: 'about.title.html', isHTML: true, page: 'index' },
    { selector: '#about p', key: 'about.body', page: 'index' },
    { selector: '#about ul li:nth-child(1)', key: 'about.li1', page: 'index' },
    { selector: '#about ul li:nth-child(2)', key: 'about.li2', page: 'index' },
    { selector: '#about ul li:nth-child(3)', key: 'about.li3', page: 'index' },
    { selector: '#about ul li:nth-child(4)', key: 'about.li4', page: 'index' },
    
    // Services section
    { selector: '#services h2', key: 'home.services.title', isHTML: true },
    { selector: '#services .section-intro', key: 'home.services.intro' },
    { selector: '#services .cards article:nth-child(1) h3', key: 'home.services.c1.title' },
    { selector: '#services .cards article:nth-child(1) p', key: 'home.services.c1.desc' },
    { selector: '#services .cards article:nth-child(2) h3', key: 'home.services.c2.title' },
    { selector: '#services .cards article:nth-child(2) p', key: 'home.services.c2.desc' },
    { selector: '#services .cards article:nth-child(3) h3', key: 'home.services.c3.title' },
    { selector: '#services .cards article:nth-child(3) p', key: 'home.services.c3.desc' },
    { selector: '#services .cards article:nth-child(4) h3', key: 'home.services.c4.title' },
    { selector: '#services .cards article:nth-child(4) p', key: 'home.services.c4.desc' },
    { selector: '#services .cards article:nth-child(5) h3', key: 'home.services.c5.title' },
    { selector: '#services .cards article:nth-child(5) p', key: 'home.services.c5.desc' },
    
    // Sectors section
    { selector: '#sectors h2', key: 'sectors.title', isHTML: true },
    { selector: '#sectors .cards article:nth-child(1) h3', key: 'sectors.c1.title' },
    { selector: '#sectors .cards article:nth-child(1) p', key: 'sectors.c1.desc' },
    { selector: '#sectors .cards article:nth-child(2) h3', key: 'sectors.c2.title' },
    { selector: '#sectors .cards article:nth-child(2) p', key: 'sectors.c2.desc' },
    { selector: '#sectors .cards article:nth-child(3) h3', key: 'sectors.c3.title' },
    { selector: '#sectors .cards article:nth-child(3) p', key: 'sectors.c3.desc' },
    { selector: '#sectors .cards article:nth-child(4) h3', key: 'sectors.c4.title' },
    { selector: '#sectors .cards article:nth-child(4) p', key: 'sectors.c4.desc' },
    
    // Clients section
    { selector: '#clients h2', key: 'clients.title', isHTML: true },
    { selector: '#clients .section-intro', key: 'clients.intro' },
    
    // Why section
    { selector: '#why h2', key: 'why.title', isHTML: true },
    { selector: '#why ul li:nth-child(1)', key: 'why.b1' },
    { selector: '#why ul li:nth-child(2)', key: 'why.b2' },
    { selector: '#why ul li:nth-child(3)', key: 'why.b3' },
    { selector: '#why ul li:nth-child(4)', key: 'why.b4' },
    { selector: '#why ul li:nth-child(5)', key: 'why.b5' },
    
         // Guarantee section (it's inside the why section)
     { selector: '#why .highlight-card .eyebrow', key: 'guarantee.eyebrow' },
     { selector: '#why .highlight-card h3', key: 'guarantee.title' },
     { selector: '#why .highlight-card p:not(.eyebrow)', key: 'guarantee.body' },
     { selector: '#why .highlight-card .btn', key: 'guarantee.cta' },
    
    // Insights section
    { selector: '#insights .eyebrow', key: 'insights.eyebrow' },
    { selector: '#insights h2', key: 'insights.title' },
    { selector: '#insights .section-intro', key: 'insights.intro' },
    { selector: '#insights .cards article:nth-child(1) h3', key: 'insights.a1.title' },
    { selector: '#insights .cards article:nth-child(1) p', key: 'insights.a1.desc' },
    { selector: '#insights .cards article:nth-child(1) .btn', key: 'insights.a1.cta' },
    { selector: '#insights .cards article:nth-child(2) h3', key: 'insights.a2.title' },
    { selector: '#insights .cards article:nth-child(2) p', key: 'insights.a2.desc' },
    { selector: '#insights .cards article:nth-child(2) .btn', key: 'insights.a2.cta' },
    
         // FAQ section
     { selector: '#faq .eyebrow', key: 'faq.eyebrow' },
     { selector: '#faq h2', key: 'faq.title' },
     { selector: '#faq .cards article:nth-child(1) h3', key: 'faq.q1' },
     { selector: '#faq .cards article:nth-child(1) p', key: 'faq.a1' },
     { selector: '#faq .cards article:nth-child(2) h3', key: 'faq.q2' },
     { selector: '#faq .cards article:nth-child(2) p', key: 'faq.a2' },
     { selector: '#faq .cards article:nth-child(3) h3', key: 'faq.q3' },
     { selector: '#faq .cards article:nth-child(3) p', key: 'faq.a3' }
  ];

  // Apply section translations (page-specific)
  sectionTranslations.forEach(({ selector, key, isHTML, page }) => {
    // Skip if this translation is for a different page
    if (page && page !== currentPage) {
      return;
    }
    
    const element = document.querySelector(selector);
    if (element && translations[key]) {
      if (isHTML) {
        element.innerHTML = translations[key];
      } else {
        element.textContent = translations[key];
      }
    }
  });

  // Special handling for footer copyright with dynamic year
  const footerCopyright = document.querySelector('.footer-meta span');
  if (footerCopyright && translations['footer.copyright']) {
    const currentYear = new Date().getFullYear();
    footerCopyright.innerHTML = `© ${currentYear} ${translations['footer.copyright']}`;
  }

  console.log('✅ Translations applied for:', lang);
}

function setLanguage(langCode) {
  console.log('🌍 Setting language to:', langCode);
  
  currentLang = langCode.toLowerCase();
  
  // Update language display
  const langDisplay = document.getElementById('cleanCurrentLang');
  if (langDisplay) {
    langDisplay.textContent = langCode.toUpperCase();
  }

  // Update flag
  const flagImg = document.getElementById('currentLangFlag');
  const flagMap = {
    'EN': { src: 'https://flagcdn.com/w20/gb.png', alt: 'English' },
    'FR': { src: 'https://flagcdn.com/w20/fr.png', alt: 'Français' },
    'ES': { src: 'https://flagcdn.com/w20/es.png', alt: 'Español' },
    'DE': { src: 'https://flagcdn.com/w20/de.png', alt: 'Deutsch' },
    'AR': { src: 'https://flagcdn.com/w20/tn.png', alt: 'العربية' }
  };
  
  if (flagImg && flagMap[langCode.toUpperCase()]) {
    const flag = flagMap[langCode.toUpperCase()];
    flagImg.src = flag.src;
    flagImg.alt = flag.alt;
  }

  // Set document attributes
  const langCodes = { EN: 'en', FR: 'fr', ES: 'es', DE: 'de', AR: 'ar' };
  document.documentElement.lang = langCodes[langCode.toUpperCase()] || 'en';
  document.documentElement.dir = langCode.toUpperCase() === 'AR' ? 'rtl' : 'ltr';

  // Apply translations
  applyTranslations(currentLang);

  // Save preference
  safeLocalStorage('set', 'site_lang', currentLang);
  
  console.log('✅ Language set to:', langCode);
}

// =============================================================================
// THEME SYSTEM
// =============================================================================

function setTheme(theme) {
  console.log('🎨 Setting theme to:', theme);
  
  currentTheme = theme;
  document.documentElement.setAttribute('data-theme', theme);
  
  // Save preference
  safeLocalStorage('set', 'theme', theme);
  
  console.log('✅ Theme set to:', theme);
}

function toggleTheme() {
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
  setTheme(newTheme);
}

// =============================================================================
// NAVIGATION SYSTEM
// =============================================================================

function initNavigation() {
  const navToggle = document.querySelector('.new-nav-toggle');
  const navMenu = document.querySelector('.new-nav-menu');
  
  if (!navToggle || !navMenu) return;

  function closeNav() {
    navMenu.classList.remove('active');
    navToggle.setAttribute('aria-expanded', 'false');
  }

  function openNav() {
    navMenu.classList.add('active');
    navToggle.setAttribute('aria-expanded', 'true');
  }

  function toggleNav() {
    if (navMenu.classList.contains('active')) {
      closeNav();
		} else {
      openNav();
    }
  }

  // Event listeners
  navToggle.addEventListener('click', (e) => {
    e.preventDefault();
    toggleNav();
  });

  // Close nav when clicking outside
  document.addEventListener('click', (e) => {
    if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
      closeNav();
    }
  });

  // Close nav on escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeNav();
    }
  });

  // Close nav when clicking nav links
  navMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', closeNav);
  });
}

// =============================================================================
// LANGUAGE DROPDOWN SYSTEM
// =============================================================================

function initLanguageDropdown() {
  const langButton = document.getElementById('cleanLangButton');
  const langDropdown = document.getElementById('cleanLangDropdown');
  
  if (!langButton || !langDropdown) return;

  function closeDropdown() {
    langDropdown.classList.remove('show');
    langButton.setAttribute('aria-expanded', 'false');
  }

  function openDropdown() {
    langDropdown.classList.add('show');
    langButton.setAttribute('aria-expanded', 'true');
  }

  function toggleDropdown() {
    if (langDropdown.classList.contains('show')) {
      closeDropdown();
    } else {
      openDropdown();
    }
  }

  // Event listeners
  langButton.addEventListener('click', (e) => {
			e.preventDefault();
    toggleDropdown();
  });

  // Handle language selection
  langDropdown.addEventListener('click', (e) => {
    const item = e.target.closest('[data-clean-lang]');
    if (item) {
      e.preventDefault();
      const langCode = item.getAttribute('data-clean-lang');
      setLanguage(langCode);
      closeDropdown();
    }
  });

  // Close dropdown when clicking outside
  document.addEventListener('click', (e) => {
    if (!langButton.contains(e.target) && !langDropdown.contains(e.target)) {
      closeDropdown();
    }
  });

  // Close dropdown on escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeDropdown();
    }
  });
}

// =============================================================================
// CONTACT FORM SYSTEM
// =============================================================================

function initContactForm() {
  const contactForm = document.getElementById('contactForm');
  if (!contactForm) return;

  const nameInput = document.getElementById('name');
  const companyInput = document.getElementById('company');
  const emailInput = document.getElementById('email');
  const phoneInput = document.getElementById('phone');
  const messageInput = document.getElementById('message');

  function setError(inputEl, message) {
    const field = inputEl?.closest('.form-field');
    if (!field) return;
    
    const errorEl = field.querySelector('.error');
    if (errorEl) {
      errorEl.textContent = message || '';
    }
    
    if (message) {
      inputEl.setAttribute('aria-invalid', 'true');
    } else {
      inputEl.removeAttribute('aria-invalid');
    }
  }

  function validateRequired(inputEl) {
    const translations = getTranslations(currentLang);
    if (!inputEl || !String(inputEl.value || '').trim()) {
      setError(inputEl, translations['contact.error.required'] || 'This field is required');
      return false;
    }
    setError(inputEl, '');
    return true;
  }

  function validateEmail(inputEl) {
    const translations = getTranslations(currentLang);
    if (!validateRequired(inputEl)) return false;
    
    const value = String(inputEl.value || '').trim();
    const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
    
    if (!isValid) {
      setError(inputEl, translations['contact.error.email'] || 'Please enter a valid email');
      return false;
    }
    
    setError(inputEl, '');
    return true;
  }

  function validatePhone(inputEl) {
    const translations = getTranslations(currentLang);
    if (!validateRequired(inputEl)) return false;
    
    const value = String(inputEl.value || '').trim();
    const isValid = /^[0-9+()\-\s]{7,}$/.test(value);
    
    if (!isValid) {
      setError(inputEl, translations['contact.error.phone'] || 'Please enter a valid phone number');
      return false;
    }
    
    setError(inputEl, '');
    return true;
  }

  function validateMessage(inputEl) {
    const translations = getTranslations(currentLang);
    if (!validateRequired(inputEl)) return false;
    
    const value = String(inputEl.value || '').trim();
    if (value.length < 10) {
      setError(inputEl, translations['contact.error.message'] || 'Message must be at least 10 characters');
      return false;
    }
    
    setError(inputEl, '');
    return true;
  }

  function validateAll() {
    const validations = [
      validateRequired(nameInput),
      validateRequired(companyInput),
      validateEmail(emailInput),
      validatePhone(phoneInput),
      validateMessage(messageInput)
    ];
    
    return validations.every(Boolean);
  }

  // Add event listeners for real-time validation
  [nameInput, companyInput, emailInput, phoneInput, messageInput].forEach(input => {
    if (input) {
      input.addEventListener('blur', () => {
        if (input === emailInput) validateEmail(input);
        else if (input === phoneInput) validatePhone(input);
        else if (input === messageInput) validateMessage(input);
        else validateRequired(input);
      });

      input.addEventListener('input', () => {
        setError(input, '');
        });
    }
});

  // Handle form submission
  contactForm.addEventListener('submit', (e) => {
    if (!validateAll()) {
      e.preventDefault();
      console.log('❌ Form validation failed');
      return;
    }
    
    console.log('✅ Form validation passed');
    // Form will submit normally to the action URL
  });
}

// =============================================================================
// ANIMATIONS & EFFECTS
// =============================================================================

function initAnimations() {
  // Reveal animations
  const revealElements = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right');
  
  function applyRevealStagger() {
    revealElements.forEach((el, index) => {
      setTimeout(() => {
        el.classList.add('revealed');
      }, index * 100);
    });
  }

  // Apply animations after page load
  window.addEventListener('load', () => {
    setTimeout(applyRevealStagger, 500);
  });

  // Back to top button
  const backToTopBtn = document.getElementById('backToTop');
  if (backToTopBtn) {
    window.addEventListener('scroll', () => {
      if (window.pageYOffset > 300) {
        backToTopBtn.classList.add('show');
      } else {
        backToTopBtn.classList.remove('show');
      }
    });

    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
}

// =============================================================================
// INITIALIZATION
// =============================================================================

function initializeApp() {
  console.log('🚀 Initializing Misra Group application...');

  // Load saved preferences
  currentLang = getStoredLang();
  currentTheme = getStoredTheme();

  // Set initial theme
  setTheme(currentTheme);

  // Set initial language
  setLanguage(currentLang);

  // Initialize components
  initNavigation();
  initLanguageDropdown();
  initContactForm();
  initAnimations();

  // Theme toggle button
  const themeToggle = document.getElementById('cleanThemeToggle');
  if (themeToggle) {
    themeToggle.addEventListener('click', (e) => {
      e.preventDefault();
      toggleTheme();
    });
  }

  console.log('✅ Application initialized successfully');
}

// =============================================================================
// DOM READY - SINGLE ENTRY POINT
// =============================================================================

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeApp);
} else {
  initializeApp();
}

// =============================================================================
// GLOBAL EXPORTS (for debugging)
// =============================================================================

window.MisraGroup = {
  setLanguage,
  setTheme,
  toggleTheme,
  getTranslations,
  applyTranslations
}; 