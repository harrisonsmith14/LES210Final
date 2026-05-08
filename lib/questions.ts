export type Question = {
  id: string;
  topic: string;
  prompt: string;
  choices: string[];
  answer: number; // index of correct choice
  explanation: string;
};

export const TOPICS = [
  "Foundations",
  "Sources of Law",
  "Constitutional Law",
  "Standards & Burdens",
  "Contracts & Torts",
  "Property",
  "Business Law",
  "Securities & Regulation",
  "Antitrust & ESG",
] as const;

export const QUESTIONS: Question[] = [
  // ---------- Foundations ----------
  {
    id: "f1",
    topic: "Foundations",
    prompt:
      "On the spectrum of governments, what are the two opposing tendencies?",
    choices: [
      "Democracy and dictatorship",
      "Self-govern and consolidate power",
      "Federalism and unitary",
      "Republic and monarchy",
    ],
    answer: 1,
    explanation:
      "The slide framed governments as a tension between self-governance (distributing power among the people) and consolidation of power (centralizing authority, e.g., a king). The American system is built on a fear of consolidated power — hence checks, balances, and federalism.",
  },
  {
    id: "f2",
    topic: "Foundations",
    prompt:
      "Markets sit on a spectrum between which two tendencies?",
    choices: [
      "Capitalism and socialism",
      "Public and private",
      "Free market and collectivism",
      "Monopoly and competition",
    ],
    answer: 2,
    explanation:
      "Just like governments, markets fall on a spectrum: free market (individual choice and ownership) on one end, collectivism (shared/state ownership) on the other. Most real systems fall somewhere in between.",
  },
  {
    id: "f3",
    topic: "Foundations",
    prompt:
      "Arizona requiring drivers to carry auto insurance is an example of which regulatory tool?",
    choices: [
      "Prohibiting behavior",
      "Incentivizing behavior",
      "Collectivism",
      "Preemption",
    ],
    answer: 1,
    explanation:
      "Insurance requirements, mortgage interest deductions, marriage benefits, and retirement accounts all incentivize behavior. Prohibiting behavior would be banning something outright — like selling organs, securities fraud, or dangerous driving.",
  },
  {
    id: "f4",
    topic: "Foundations",
    prompt:
      "IRAC is best described as:",
    choices: [
      "A federal agency",
      "A constitutional doctrine",
      "A method to organize legal analysis (Issue, Rule, Application, Conclusion)",
      "A type of court order",
    ],
    answer: 2,
    explanation:
      "IRAC stands for Issue, Rule, Application/Analysis, Conclusion. It's how lawyers, courts, and law students structure legal reasoning — identify the legal issue, state the rule, apply the rule to the facts, then reach a conclusion.",
  },

  // ---------- Sources of Law ----------
  {
    id: "s1",
    topic: "Sources of Law",
    prompt:
      "Which of the following is NOT a primary (mandatory) source of law?",
    choices: [
      "The U.S. Constitution",
      "A federal statute",
      "A federal regulation",
      "A law review article",
    ],
    answer: 3,
    explanation:
      "Primary sources are mandatory: Constitution, statutes, regulations, and case law (common law). Law review articles, treatises, and Restatements are secondary sources — persuasive only, never binding.",
  },
  {
    id: "s2",
    topic: "Sources of Law",
    prompt:
      "Rank these sources from highest to lowest legal authority within a single jurisdiction:",
    choices: [
      "Statutes → Constitution → Regulations → Case law",
      "Constitution → Statutes/Treaties → Regulations → Case law",
      "Regulations → Statutes → Constitution → Case law",
      "Case law → Constitution → Statutes → Regulations",
    ],
    answer: 1,
    explanation:
      "The hierarchy pyramid from class: Constitution at the top, then statutes and treaties, then regulations, then case law at the base. A lower source can never override a higher one.",
  },
  {
    id: "s3",
    topic: "Sources of Law",
    prompt:
      'A primary source is "mandatory" — but with what important qualifier?',
    choices: [
      "Only if signed by the President",
      "Only in the relevant jurisdiction",
      "Only if it predates the Constitution",
      "Only if a court has cited it",
    ],
    answer: 1,
    explanation:
      "Primary sources are mandatory only in the jurisdiction that produced them. A California Supreme Court decision is mandatory in California courts but only persuasive in Arizona.",
  },
  {
    id: "s4",
    topic: "Sources of Law",
    prompt:
      "What's the difference between substantive law and procedural law?",
    choices: [
      "Substantive law applies to civil cases; procedural law applies to criminal cases",
      "Substantive law defines rights and duties; procedural law sets the rules for enforcing them",
      "Substantive law is federal; procedural law is state",
      "There is no meaningful difference",
    ],
    answer: 1,
    explanation:
      "Substantive law is the WHAT — it defines legal rights, duties, and crimes (e.g., the law against murder). Procedural law is the HOW — the rules for filing, evidence, trial, and appeals.",
  },
  {
    id: "s5",
    topic: "Sources of Law",
    prompt:
      "Which best describes the difference between law and equity?",
    choices: [
      "Law deals with money damages; equity deals with remedies like injunctions and specific performance",
      "Law is statutory; equity is constitutional",
      "Law is federal; equity is state",
      "Law is criminal; equity is civil",
    ],
    answer: 0,
    explanation:
      "Historically, courts of law awarded monetary damages, while courts of equity provided remedies that money couldn't fix — injunctions, specific performance, rescission. Most U.S. courts now merge both, but the distinction in remedies remains.",
  },

  // ---------- Constitutional Law ----------
  {
    id: "c1",
    topic: "Constitutional Law",
    prompt:
      "Federalism means that:",
    choices: [
      "The federal government has unlimited powers over the states",
      "States have unlimited powers over the federal government",
      "The federal government has only enumerated and implied powers; everything else is reserved to the states",
      "Only the federal government can pass laws",
    ],
    answer: 2,
    explanation:
      "Federalism: the federal government has only the powers enumerated (express) in the Constitution and powers reasonably implied from them. The 10th Amendment reserves everything else to the states (or the people).",
  },
  {
    id: "c2",
    topic: "Constitutional Law",
    prompt:
      'The Supremacy Clause (Article VI) says federal law is "the supreme Law of the Land." This gives rise to which doctrine?',
    choices: [
      "Incorporation",
      "Preemption",
      "Standing",
      "Stare decisis",
    ],
    answer: 1,
    explanation:
      "Preemption: when federal law conflicts with state law, federal law wins. State law is preempted (displaced). Note: this only applies when the federal government is acting within its enumerated powers.",
  },
  {
    id: "c3",
    topic: "Constitutional Law",
    prompt:
      "Which amendment protects against unreasonable searches and seizures?",
    choices: ["First", "Second", "Fourth", "Fifth"],
    answer: 2,
    explanation:
      "Fourth Amendment = unreasonable searches and seizures. First = speech/press/religion. Second = guns. Fifth = jury trial, confessions, due process, and the Takings Clause.",
  },
  {
    id: "c4",
    topic: "Constitutional Law",
    prompt:
      "The right to a lawyer and a speedy trial comes from which amendment?",
    choices: ["Fourth", "Fifth", "Sixth", "Eighth"],
    answer: 2,
    explanation:
      "Sixth Amendment guarantees right to counsel and a speedy public trial. The Eighth Amendment covers cruel and unusual punishment. Don't confuse them.",
  },
  {
    id: "c5",
    topic: "Constitutional Law",
    prompt:
      "The Fifth Amendment due process clause restricts which government? The Fourteenth Amendment due process clause restricts which government?",
    choices: [
      "Both restrict the federal government",
      "Both restrict state governments",
      "Fifth restricts the federal government; Fourteenth restricts state governments",
      "Fifth restricts state governments; Fourteenth restricts the federal government",
    ],
    answer: 2,
    explanation:
      "The 5th Amendment says \"No person shall be… deprived of life, liberty, or property\" — applies to the federal government. The 14th Amendment says \"No state shall…\" and applies to state governments. The Incorporation Doctrine uses the 14th Amendment to apply most Bill of Rights protections against the states.",
  },
  {
    id: "c6",
    topic: "Constitutional Law",
    prompt:
      "The Incorporation Doctrine refers to:",
    choices: [
      "The process of forming a corporation",
      "Applying most Bill of Rights protections to the states through the 14th Amendment",
      "Federal preemption of state law",
      "The Equal Protection Clause",
    ],
    answer: 1,
    explanation:
      "Incorporation: the Supreme Court has used the 14th Amendment's Due Process Clause to make most Bill of Rights protections binding on state governments. Reverse incorporation works the opposite way — applying 14th Amendment Equal Protection back against the federal government via the 5th Amendment.",
  },
  {
    id: "c7",
    topic: "Constitutional Law",
    prompt:
      'In Heart of Atlanta Motel v. United States, the Court reasoned: "If it is interstate commerce that feels the pinch, it does not matter how local the operation which applies the squeeze." This case upheld:',
    choices: [
      "A state law banning segregation",
      "A federal anti-discrimination law (Civil Rights Act) under the Commerce Clause",
      "A motel's right to refuse service",
      "A state minimum wage law",
    ],
    answer: 1,
    explanation:
      "Heart of Atlanta upheld Title II of the Civil Rights Act of 1964 under the Commerce Clause. Even though the motel was a single local business, its discrimination affected interstate travel and commerce — so Congress could regulate it.",
  },
  {
    id: "c8",
    topic: "Constitutional Law",
    prompt:
      "The Tenth Amendment is best described as:",
    choices: [
      "A guarantee of free speech",
      "A reservation of unenumerated powers to the states (or the people)",
      "The Equal Protection Clause",
      "The basis for the Incorporation Doctrine",
    ],
    answer: 1,
    explanation:
      "10th Amendment: any powers not granted to the federal government, and not prohibited to the states, are reserved to the states or the people. It's the structural backbone of federalism.",
  },

  // ---------- Standards & Burdens ----------
  {
    id: "p1",
    topic: "Standards & Burdens",
    prompt:
      "Order these standards of proof from LOWEST to HIGHEST confidence:",
    choices: [
      "Probable cause → reasonable suspicion → preponderance → beyond a reasonable doubt",
      "Reasonable suspicion → probable cause → preponderance → beyond a reasonable doubt",
      "Preponderance → reasonable suspicion → probable cause → beyond a reasonable doubt",
      "Beyond a reasonable doubt → preponderance → probable cause → reasonable suspicion",
    ],
    answer: 1,
    explanation:
      "From lowest to highest: reasonable suspicion (a hunch + facts, used for stops) → probable cause (used for arrests/warrants) → preponderance of the evidence (>50%, civil cases) → beyond a reasonable doubt (highest, criminal cases).",
  },
  {
    id: "p2",
    topic: "Standards & Burdens",
    prompt:
      "In a civil case, who has the burden of proof, and what standard must they meet?",
    choices: [
      "The defendant; beyond a reasonable doubt",
      "The plaintiff; preponderance of the evidence",
      "The plaintiff; beyond a reasonable doubt",
      "The prosecution; probable cause",
    ],
    answer: 1,
    explanation:
      "In civil cases, the plaintiff bears the burden and must prove the defendant's liability by a preponderance of the evidence — meaning more likely than not (>50%).",
  },
  {
    id: "p3",
    topic: "Standards & Burdens",
    prompt:
      "In a criminal case, who has the burden of proof, and what standard must they meet?",
    choices: [
      "The defendant; preponderance of the evidence",
      "The prosecution; preponderance of the evidence",
      "The prosecution; beyond a reasonable doubt",
      "The judge; probable cause",
    ],
    answer: 2,
    explanation:
      "In criminal cases, the prosecution bears the burden and must prove the defendant's guilt beyond a reasonable doubt — the highest standard in the legal system, because liberty is at stake.",
  },
  {
    id: "p4",
    topic: "Standards & Burdens",
    prompt:
      "A police officer wants to make a brief investigatory stop of someone acting strangely. What's the minimum standard required?",
    choices: [
      "Reasonable suspicion",
      "Probable cause",
      "Preponderance of the evidence",
      "Beyond a reasonable doubt",
    ],
    answer: 0,
    explanation:
      "Reasonable suspicion — articulable facts suggesting criminal activity — is enough for a brief stop (a Terry stop). To make an arrest or get a warrant, the officer needs probable cause, which is a higher standard.",
  },

  // ---------- Contracts & Torts ----------
  {
    id: "k1",
    topic: "Contracts & Torts",
    prompt:
      "What are the three required elements of an enforceable contract?",
    choices: [
      "Offer, acceptance, and writing",
      "Offer, acceptance, and consideration",
      "Mutual assent, witnesses, and notarization",
      "Promise, performance, and breach",
    ],
    answer: 1,
    explanation:
      "Offer + Acceptance + Consideration = Enforceable Contract. Offer and acceptance together form mutual assent (the meeting of the minds). Consideration is what each side gives up — the bargained-for exchange.",
  },
  {
    id: "k2",
    topic: "Contracts & Torts",
    prompt:
      'In contract formation, "mutual assent" is created by:',
    choices: [
      "A signed writing",
      "Offer + acceptance",
      "Consideration",
      "A notary",
    ],
    answer: 1,
    explanation:
      "Mutual assent (the meeting of the minds) is formed when a valid offer is met by a valid acceptance. Consideration is a separate, third element required for an enforceable contract.",
  },
  {
    id: "k3",
    topic: "Contracts & Torts",
    prompt:
      "What are the three types of torts?",
    choices: [
      "Civil, criminal, and equitable",
      "Intentional, negligence, and strict liability",
      "Contract, property, and personal injury",
      "Federal, state, and local",
    ],
    answer: 1,
    explanation:
      "The three categories of torts: (1) Intentional torts (e.g., battery, fraud), (2) Negligence (failure to use reasonable care), and (3) Strict liability (liability without fault, e.g., abnormally dangerous activities, defective products).",
  },
  {
    id: "k4",
    topic: "Contracts & Torts",
    prompt:
      "A driver is held liable for injuries caused by a defective car part, even though they did nothing wrong. This is an example of:",
    choices: [
      "Intentional tort",
      "Negligence",
      "Strict liability",
      "Breach of contract",
    ],
    answer: 2,
    explanation:
      "Strict liability imposes responsibility regardless of fault or intent. It applies to abnormally dangerous activities and defective products. The plaintiff doesn't have to prove negligence — only that the product caused the harm.",
  },

  // ---------- Property ----------
  {
    id: "pr1",
    topic: "Property",
    prompt:
      "What are the three main types of property?",
    choices: [
      "Real, fake, and digital",
      "Personal, real, and intellectual",
      "Tangible, intangible, and shared",
      "Public, private, and corporate",
    ],
    answer: 1,
    explanation:
      "The three categories: Personal property (movable items — phone, car), Real property (land, buildings, fixtures), and Intellectual property (creations of the mind — patents, copyrights, trademarks, trade secrets).",
  },
  {
    id: "pr2",
    topic: "Property",
    prompt:
      "Property rights navigate the tension between which two opposing rights?",
    choices: [
      "Right to buy and right to sell",
      "Right to exclude and right of access",
      "Right to use and right to destroy",
      "Right to inherit and right to gift",
    ],
    answer: 1,
    explanation:
      "All property law balances the owner's right to exclude others against various public or private rights of access (easements, public accommodations, eminent domain, etc.).",
  },
  {
    id: "pr3",
    topic: "Property",
    prompt:
      'The Fifth Amendment\'s Takings Clause states that private property shall not be "taken for public use, without ___."',
    choices: [
      "due process",
      "court order",
      "just compensation",
      "majority vote",
    ],
    answer: 2,
    explanation:
      'The Takings Clause requires "just compensation" when the government takes private property for public use (eminent domain). Due process protects against being deprived of property without fair procedures, but compensation is the specific Takings Clause requirement.',
  },
  {
    id: "pr4",
    topic: "Property",
    prompt:
      "What's the key difference between a freehold estate and a leasehold estate?",
    choices: [
      "Freehold = ownership (right of title); Leasehold = right to use (tenancy)",
      "Freehold is for businesses; leasehold is for residences",
      "Freehold lasts 99 years; leasehold is permanent",
      "Freehold is federal; leasehold is state",
    ],
    answer: 0,
    explanation:
      "Freehold = ownership of title (you own land, improvements, fixtures, plus air and subsurface rights). Leasehold = a right to USE the property (a tenancy) for a defined period. Marshall lives in a leasehold (a dorm license, technically).",
  },
  {
    id: "pr5",
    topic: "Property",
    prompt:
      "Which method of acquiring title is a creature of statute and common law (rather than contract)?",
    choices: [
      "Purchase",
      "Lease",
      "Easement",
      "Adverse possession",
    ],
    answer: 3,
    explanation:
      "Adverse possession — gaining title by openly, continuously, and exclusively occupying someone else's land for a statutory period — is governed by statute and common law. Purchase, lease, license, easement, and gift/inheritance are all primarily creatures of contract law.",
  },
  {
    id: "pr6",
    topic: "Property",
    prompt:
      "What's the difference between a lease and a license?",
    choices: [
      "A lease is for cars; a license is for property",
      "A lease grants exclusive possession; a license grants non-exclusive use",
      "A lease is verbal; a license is written",
      "A lease is federal; a license is state",
    ],
    answer: 1,
    explanation:
      "A lease (e.g., apartment) gives you exclusive possession — the landlord cannot just walk in. A license (e.g., a college dorm room or a movie ticket) gives non-exclusive use — the property owner retains substantial control and access.",
  },
  {
    id: "pr7",
    topic: "Property",
    prompt:
      "Which of the following is a duty of property owners (whether you live in it or rent it out)?",
    choices: [
      "Pay federal income tax on the property",
      "Keep the premises safe for invitees and avoid creating a nuisance",
      "Sell to the highest bidder",
      "Allow public tours",
    ],
    answer: 1,
    explanation:
      "Property owners owe duties to keep premises safe for invitees, avoid nuisance (penalty: tort claim), and comply with community standards like zoning. These apply whether you live on the property or rent it out.",
  },
  {
    id: "pr8",
    topic: "Property",
    prompt:
      "Why do businesses protect intellectual property?",
    choices: [
      "To pay less tax",
      "To preserve goodwill (intangible value)",
      "Because federal law requires it",
      "To avoid antitrust scrutiny",
    ],
    answer: 1,
    explanation:
      "Businesses protect IP — trademarks, patents, copyrights, trade secrets — to preserve goodwill, the intangible value of their brand, reputation, innovations, and competitive secrets. Goodwill often dwarfs a company's tangible assets.",
  },

  // ---------- Business Law ----------
  {
    id: "b1",
    topic: "Business Law",
    prompt:
      "Which of the following business structures is NOT a separate legal entity from its owner?",
    choices: [
      "Sole proprietorship",
      "Corporation",
      "Limited liability company (LLC)",
      "Limited partnership",
    ],
    answer: 0,
    explanation:
      "A sole proprietorship is just a person doing business — it's not a separate legal entity. The owner is personally liable for everything. Corporations and LLCs are separate legal entities (the \"bubble\" of limited liability). Partnerships are entities too, though general partners face personal liability.",
  },
  {
    id: "b2",
    topic: "Business Law",
    prompt:
      'The professor described limited liability as a "bubble" because:',
    choices: [
      "It can pop and disappear at any time",
      "It's a legal fiction that separates the entity from its owners, management, and employees",
      "It only applies to startups",
      "It's regulated by the SEC",
    ],
    answer: 1,
    explanation:
      "An entity, at its best, is a legal fiction — a bubble — that separates the company from its owners. Owners' personal assets are protected if the company gets sued. But the bubble can be \"pierced\" if owners abuse the form.",
  },
  {
    id: "b3",
    topic: "Business Law",
    prompt:
      "Under pass-through taxation:",
    choices: [
      "The entity pays tax, then the owners pay tax again on dividends",
      "Entity net income is not taxable; owners report income on their personal returns via K-1",
      "Only the federal government taxes the income",
      "The entity gets a tax credit",
    ],
    answer: 1,
    explanation:
      "Pass-through taxation: the entity itself pays no income tax. It files an informational return and issues a K-1 to each owner, who reports the income on their personal return. LLCs and partnerships typically use this. Compare to corporate taxation, which causes \"double taxation.\"",
  },
  {
    id: "b4",
    topic: "Business Law",
    prompt:
      'Why is corporate taxation called "double taxation"?',
    choices: [
      "Federal and state both tax the corporation",
      "The entity pays income tax on its profits, and shareholders pay tax again when they receive dividends",
      "Corporations are taxed twice as much as individuals",
      "Both employees and owners are taxed",
    ],
    answer: 1,
    explanation:
      "Double taxation: a C-corporation pays corporate income tax on its net income. Then, when after-tax profits are distributed as dividends, shareholders pay income tax on those dividends. The same dollar of profit is taxed twice.",
  },
  {
    id: "b5",
    topic: "Business Law",
    prompt:
      "Which of the following is an ADVANTAGE of debt financing over equity financing?",
    choices: [
      "You don't have to pay it back",
      "You retain 100% ownership of your company",
      "Investors get unlimited upside",
      "You can keep the money even in bankruptcy",
    ],
    answer: 1,
    explanation:
      "Debt: you keep 100% ownership and (eventually) regain full control. Disadvantages: must repay with interest. Equity: dilutes ownership but no repayment obligation. Each round of equity means you own less.",
  },
  {
    id: "b6",
    topic: "Business Law",
    prompt:
      "A startup is most likely to receive its FIRST round of outside financing from:",
    choices: [
      "A major bank loan",
      'Friends, family, and "fools" (Triple-F) or angel investors',
      "A public stock offering",
      "Private equity",
    ],
    answer: 1,
    explanation:
      "Bootstrapping (founders) → Triple-F (friends, family, fools) → Angels → Venture Capital → Private Equity. Bank debt is unlikely as a first financing because banks want predictable financials and personal guaranties.",
  },

  // ---------- Securities & Regulation ----------
  {
    id: "sr1",
    topic: "Securities & Regulation",
    prompt:
      "The Securities Act of 1933 primarily regulates:",
    choices: [
      "Trading on stock exchanges",
      "Registration and exemption when selling securities",
      "Insider trading",
      "Antitrust violations",
    ],
    answer: 1,
    explanation:
      "1933 Act = registration and exemption (the initial sale of securities to the public). 1934 Act = trading (ongoing markets, the SEC, public company reporting, insider trading rules).",
  },
  {
    id: "sr2",
    topic: "Securities & Regulation",
    prompt:
      'State securities laws are sometimes called "blue sky laws." Under the principle in your slides, if a securities offering is exempt under federal law, it is:',
    choices: [
      "Still subject to state registration",
      "Exempt under state law (preemption)",
      "Automatically illegal",
      "Subject to double registration",
    ],
    answer: 1,
    explanation:
      "Federal preemption: when a federal exemption applies (like Reg D), state blue sky laws are preempted from requiring registration. The states retain anti-fraud authority but cannot require additional registration.",
  },
  {
    id: "sr3",
    topic: "Securities & Regulation",
    prompt:
      "Regulation D is best described as:",
    choices: [
      "A registration requirement",
      "An exemption from federal securities registration",
      "A federal antitrust statute",
      "A type of corporate tax election",
    ],
    answer: 1,
    explanation:
      "Reg D is one of the most-used exemptions from registration under the Securities Act of 1933. It allows private placements (typically to accredited investors) without going through the costly full registration process.",
  },
  {
    id: "sr4",
    topic: "Securities & Regulation",
    prompt:
      "An administrative agency derives its authority from:",
    choices: [
      "The Constitution directly",
      "Enabling legislation passed by the legislature",
      "The Supreme Court",
      "The President alone",
    ],
    answer: 1,
    explanation:
      "Agencies are created and empowered by enabling legislation — a statute that gives them authority to carry out legislative intent. Because the legislature created them, the legislature can also dissolve them.",
  },
  {
    id: "sr5",
    topic: "Securities & Regulation",
    prompt:
      "Why is the regulatory state sometimes said to combine all three branches of government?",
    choices: [
      "Because agencies can issue rules (legislative), enforce them (executive), and adjudicate disputes (judicial)",
      "Because they are run by judges, governors, and legislators",
      "Because they require approval from all three branches",
      "Because they only operate during election years",
    ],
    answer: 0,
    explanation:
      "Administrative agencies issue rules (legislative power), investigate and enforce them through orders (executive power), and adjudicate disputes through ALJs (judicial power) — all in one entity. This combination is why agency power is sometimes controversial.",
  },
  {
    id: "sr6",
    topic: "Securities & Regulation",
    prompt:
      "What is the key factor in classifying a worker as an employee vs. an independent contractor?",
    choices: [
      "How much they are paid",
      "Whether they receive a W-2 or a 1099",
      "The degree of control the employer has over their work",
      "Whether they have a written contract",
    ],
    answer: 2,
    explanation:
      "The legal test centers on the degree of control: does the company control how, when, and where the work is done? More control = employee. Independent contractors trade labor protections for greater autonomy and (often) higher gross pay.",
  },

  // ---------- Antitrust & ESG ----------
  {
    id: "a1",
    topic: "Antitrust & ESG",
    prompt:
      "Antitrust laws regulate:",
    choices: [
      "Banking practices",
      "Economic competition",
      "Securities sales",
      "Labor unions only",
    ],
    answer: 1,
    explanation:
      "Antitrust laws regulate economic competition — preventing monopolies, restraints of trade, and anti-competitive mergers. The big three statutes: the Sherman Act, Clayton Act, and FTC Act.",
  },
  {
    id: "a2",
    topic: "Antitrust & ESG",
    prompt:
      "Section 1 of the Sherman Act forbids ___, while Section 2 forbids ___.",
    choices: [
      "monopolization; restraint of trade",
      "restraint of trade; monopolization",
      "price fixing; mergers",
      "insider trading; fraud",
    ],
    answer: 1,
    explanation:
      "Sherman Act §1 = restraint of trade (agreements between competitors that restrain competition, like price-fixing). Sherman Act §2 = monopolization (single firms acquiring or maintaining monopoly power through anticompetitive conduct).",
  },
  {
    id: "a3",
    topic: "Antitrust & ESG",
    prompt:
      'A merger between two competitors in the same industry is best described as a ___ merger.',
    choices: [
      "vertical",
      "horizontal",
      "conglomerate",
      "reverse",
    ],
    answer: 1,
    explanation:
      "Horizontal = competitors in the same market (e.g., two airlines merging). Vertical = different stages of the same supply chain (e.g., a manufacturer buying its supplier). Conglomerate = unrelated businesses.",
  },
  {
    id: "a4",
    topic: "Antitrust & ESG",
    prompt:
      "ESG/CSR principles represent a shift from:",
    choices: [
      "Stakeholder value to shareholder value",
      "Shareholder value to stakeholder value",
      "Public to private companies",
      "State to federal regulation",
    ],
    answer: 1,
    explanation:
      "Traditionally, the corporate goal was maximizing shareholder value (Friedman doctrine). The modern shift toward ESG (Environmental, Social, Governance) and CSR (Corporate Social Responsibility) reframes the goal as creating value for all stakeholders — employees, communities, environment, customers, and shareholders.",
  },
  {
    id: "a5",
    topic: "Antitrust & ESG",
    prompt:
      "A benefit corporation is best described as:",
    choices: [
      "A nonprofit organization",
      "A government agency",
      "A for-profit corporation legally permitted to pursue social or environmental goals alongside profit",
      "A type of sole proprietorship",
    ],
    answer: 2,
    explanation:
      "A benefit corporation (B-corp) is a for-profit entity that has legally committed to pursuing a public benefit alongside profit. Directors are protected when balancing stakeholder interests against pure profit maximization. It's distinct from a nonprofit, which can't distribute profits to owners.",
  },
];
