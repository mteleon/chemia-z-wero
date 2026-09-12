export type QuizTopic = "Atom i wiązania" | "Kwasy, zasady i sole" | "Redoks i pierwiastki" | "Elektrochemia";

export type QuizQuestion = {
  topic: QuizTopic;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
};

export const inorganicDiagnosticQuestions: QuizQuestion[] = [
  {
    topic: "Atom i wiązania",
    question: "Który zestaw liczb kwantowych może opisywać elektron walencyjny atomu bromu w stanie podstawowym?",
    options: ["n = 4, l = 1, m = 0, s = +½", "n = 4, l = 3, m = 0, s = −½", "n = 3, l = 3, m = +1, s = +½", "n = 4, l = 2, m = +3, s = −½"],
    correctAnswer: 0,
    explanation: "Brom ma elektrony walencyjne 4s²4p⁵. Dla orbitalu p: l = 1, a m może przyjmować wartości −1, 0 lub +1.",
  },
  {
    topic: "Atom i wiązania",
    question: "Jon X³⁺ ma konfigurację elektronową [Ar]3d⁵. Pierwiastek X należy do bloku d i jest: ",
    options: ["chromem", "manganem", "żelazem", "kobaltem"],
    correctAnswer: 2,
    explanation: "Fe ma konfigurację [Ar]3d⁶4s². Przy tworzeniu Fe³⁺ odchodzą najpierw dwa elektrony 4s, a potem jeden 3d, więc zostaje 3d⁵.",
  },
  {
    topic: "Atom i wiązania",
    question: "W której cząsteczce centralny atom ma jednocześnie hybrydyzację sp³ i geometrię elektronową tetraedryczną, lecz kształt cząsteczki nie jest tetraedryczny?",
    options: ["CH₄", "BF₃", "NH₃", "CO₂"],
    correctAnswer: 2,
    explanation: "W NH₃ są cztery pary elektronowe wokół azotu (sp³), ale jedna jest wolna, dlatego kształt cząsteczki jest piramidalny trygonalny.",
  },
  {
    topic: "Atom i wiązania",
    question: "Spośród podanych cząsteczek największy moment dipolowy ma najprawdopodobniej:",
    options: ["CO₂", "BF₃", "CCl₄", "H₂O"],
    correctAnswer: 3,
    explanation: "CO₂, BF₃ i CCl₄ są symetryczne, więc wektory momentów wiązań się znoszą. Kątowa cząsteczka H₂O jest polarna.",
  },
  {
    topic: "Atom i wiązania",
    question: "Które porównanie promieni jonowych jest poprawne?",
    options: ["O²⁻ < F⁻ < Na⁺ < Mg²⁺", "Mg²⁺ < Na⁺ < F⁻ < O²⁻", "Na⁺ < Mg²⁺ < F⁻ < O²⁻", "F⁻ < O²⁻ < Mg²⁺ < Na⁺"],
    correctAnswer: 1,
    explanation: "Wszystkie te jony są izoelektronowe (10 e⁻). Im większy ładunek jądra, tym mniejszy promień: Mg²⁺ < Na⁺ < F⁻ < O²⁻.",
  },
  {
    topic: "Atom i wiązania",
    question: "W cząsteczce SO₂ liczba wiązań σ i π (w jednym zapisie Lewisa z dwoma wiązaniami podwójnymi) wynosi odpowiednio:",
    options: ["1 i 2", "2 i 1", "2 i 2", "3 i 2"],
    correctAnswer: 2,
    explanation: "Każde wiązanie podwójne zawiera jedno wiązanie σ i jedno π. Dwa wiązania S=O dają łącznie 2 σ oraz 2 π.",
  },
  {
    topic: "Atom i wiązania",
    question: "Która substancja ma sieć krystaliczną atomową, a nie jonową ani cząsteczkową?",
    options: ["SiO₂", "NaCl", "I₂", "suchy lód"],
    correctAnswer: 0,
    explanation: "W krysztale SiO₂ atomy są połączone rozległą siecią wiązań kowalencyjnych. To tłumaczy jego dużą twardość i wysoką temperaturę topnienia.",
  },
  {
    topic: "Atom i wiązania",
    question: "Która zmiana na pewno zwiększa energię pierwszej jonizacji atomu?",
    options: ["Przejście w dół tej samej grupy", "Przejście w prawo w drugim okresie, z Be do Ne", "Przyłączenie elektronu do atomu", "Wzrost liczby powłok elektronowych"],
    correctAnswer: 1,
    explanation: "W drugim okresie, pomijając drobne wyjątki wynikające z podpowłok, efektywny ładunek jądra rośnie ku prawej, więc elektron trudniej oderwać.",
  },
  {
    topic: "Kwasy, zasady i sole",
    question: "Do roztworu zawierającego 0,10 mol CH₃COOH i 0,10 mol CH₃COONa dodano małą ilość HCl. Które zdanie jest poprawne?",
    options: ["pH gwałtownie spadnie do 1", "Jony H⁺ przereagują głównie z CH₃COO⁻, tworząc CH₃COOH", "Stężenie CH₃COO⁻ wzrośnie", "Roztwór przestanie być buforem niezależnie od ilości HCl"],
    correctAnswer: 1,
    explanation: "To bufor octanowy. Dodane H⁺ są wiązane przez zasadę sprzężoną CH₃COO⁻, dlatego pH zmienia się niewiele.",
  },
  {
    topic: "Kwasy, zasady i sole",
    question: "W którym roztworze, przy jednakowym stężeniu 0,10 mol·dm⁻³, pH będzie największe?",
    options: ["NH₄Cl", "NaCl", "CH₃COONa", "AlCl₃"],
    correctAnswer: 2,
    explanation: "Anion octanowy ulega hydrolizie zasadowej. NH₄⁺ i uwodniony Al³⁺ zakwaszają roztwór, a NaCl praktycznie nie hydrolizuje.",
  },
  {
    topic: "Kwasy, zasady i sole",
    question: "Który tlenek reaguje zarówno z HCl(aq), jak i z NaOH(aq)?",
    options: ["CaO", "SO₃", "Al₂O₃", "CO₂"],
    correctAnswer: 2,
    explanation: "Al₂O₃ jest tlenkiem amfoterycznym: z kwasem tworzy sole glinu, a z mocną zasadą gliniany/hydroksokompleksy.",
  },
  {
    topic: "Kwasy, zasady i sole",
    question: "Które równanie jonowe skrócone poprawnie opisuje reakcję wodorowęglanu z mocnym kwasem?",
    options: ["HCO₃⁻ + H⁺ → CO₂↑ + H₂O", "HCO₃⁻ + OH⁻ → CO₂↑ + H₂O", "CO₃²⁻ + H⁺ → HCO₃⁻", "HCO₃⁻ → CO₃²⁻ + H⁺"],
    correctAnswer: 0,
    explanation: "Zakwaszenie HCO₃⁻ prowadzi przez nietrwały H₂CO₃ do CO₂ i wody. To efekt musowania w reakcji wodorowęglanów z kwasami.",
  },
  {
    topic: "Kwasy, zasady i sole",
    question: "Zmieszano równe objętości 0,020 mol·dm⁻³ BaCl₂ i 0,030 mol·dm⁻³ Na₂SO₄. Który jon pozostanie w nadmiarze po strąceniu osadu?",
    options: ["Ba²⁺", "SO₄²⁻", "Na⁺", "Cl⁻"],
    correctAnswer: 1,
    explanation: "Reakcja zachodzi w stosunku 1 : 1: Ba²⁺ + SO₄²⁻ → BaSO₄↓. W tej samej objętości jest więcej moli SO₄²⁻ (0,030 wobec 0,020).",
  },
  {
    topic: "Kwasy, zasady i sole",
    question: "Jak zmieni się rozpuszczalność Mg(OH)₂ po dodaniu NH₄Cl do nasyconego roztworu?",
    options: ["Zmniejszy się, bo wzrośnie stężenie OH⁻", "Wzrośnie, bo NH₄⁺ wiąże OH⁻", "Nie zmieni się, bo NH₄Cl jest solą", "Spadnie do zera"],
    correctAnswer: 1,
    explanation: "NH₄⁺ reaguje z OH⁻: NH₄⁺ + OH⁻ ⇌ NH₃ + H₂O. Usuwanie OH⁻ przesuwa równowagę rozpuszczania Mg(OH)₂ w prawo.",
  },
  {
    topic: "Kwasy, zasady i sole",
    question: "Która para reagentów pozwoli otrzymać Fe(OH)₃ jako osad?",
    options: ["FeCl₃(aq) i NaOH(aq)", "Fe(s) i H₂O(l)", "Fe₂O₃(s) i HCl(aq)", "FeCl₂(aq) i NaCl(aq)"],
    correctAnswer: 0,
    explanation: "Trwały osad Fe(OH)₃ strąca się z jonów Fe³⁺ i OH⁻: Fe³⁺ + 3OH⁻ → Fe(OH)₃↓.",
  },
  {
    topic: "Kwasy, zasady i sole",
    question: "Zgodnie z teorią Brønsteda–Lowry’ego w reakcji NH₃ + H₂O ⇌ NH₄⁺ + OH⁻ woda pełni funkcję:",
    options: ["kwasu, ponieważ oddaje proton", "zasady, ponieważ przyjmuje proton", "utleniacza", "wyłącznie rozpuszczalnika"],
    correctAnswer: 0,
    explanation: "H₂O oddaje proton cząsteczce NH₃ i przechodzi w OH⁻, zatem jest kwasem Brønsteda.",
  },
  {
    topic: "Redoks i pierwiastki",
    question: "W reakcji 2MnO₄⁻ + 5C₂O₄²⁻ + 16H⁺ → 2Mn²⁺ + 10CO₂ + 8H₂O utleniaczem jest:",
    options: ["C₂O₄²⁻", "H⁺", "MnO₄⁻", "CO₂"],
    correctAnswer: 2,
    explanation: "Mangan zmienia stopień utlenienia z +VII w MnO₄⁻ na +II w Mn²⁺, czyli ulega redukcji. Redukująca się substancja jest utleniaczem.",
  },
  {
    topic: "Redoks i pierwiastki",
    question: "Który produkt redukcji jonów manganianowych(VII) jest typowy w środowisku obojętnym lub słabo zasadowym?",
    options: ["Mn²⁺", "MnO₂", "MnO₄²⁻ wyłącznie", "Mn(s)"],
    correctAnswer: 1,
    explanation: "W środowisku obojętnym zwykle powstaje brunatny osad MnO₂. W kwasowym produktem jest najczęściej Mn²⁺.",
  },
  {
    topic: "Redoks i pierwiastki",
    question: "Po dodaniu nadmiaru stężonego HCl do KMnO₄ i ogrzaniu obserwuje się wydzielanie chloru. Który jon ulega utlenieniu?",
    options: ["K⁺", "MnO₄⁻", "Cl⁻", "H⁺"],
    correctAnswer: 2,
    explanation: "Cl⁻ przechodzi ze stopnia −I w cząsteczce Cl₂ na 0. Permanganian(VII) pełni tu rolę silnego utleniacza.",
  },
  {
    topic: "Redoks i pierwiastki",
    question: "Która obserwacja najlepiej potwierdza, że cynk wypiera miedź z roztworu CuSO₄?",
    options: ["Roztwór intensywnieje na niebiesko", "Na cynku pojawia się czerwonobrunatny nalot, a niebieska barwa słabnie", "Wydziela się bezbarwny gaz", "Powstaje biały osad BaSO₄"],
    correctAnswer: 1,
    explanation: "Zn utlenia się do Zn²⁺, a Cu²⁺ redukuje do metalicznej Cu. Ubywa zatem niebieskich jonów Cu²⁺ i osadza się miedź.",
  },
  {
    topic: "Redoks i pierwiastki",
    question: "W reakcji Cr₂O₇²⁻ + 14H⁺ + 6e⁻ → 2Cr³⁺ + 7H₂O liczba elektronów przyjętych przez jeden atom chromu wynosi:",
    options: ["1", "2", "3", "6"],
    correctAnswer: 2,
    explanation: "Chrom zmienia stopień utlenienia z +VI na +III, więc każdy atom Cr przyjmuje 3 elektrony. Dwa atomy łącznie przyjmują 6 e⁻.",
  },
  {
    topic: "Redoks i pierwiastki",
    question: "Który zestaw reagentów odróżni roztwór Na₂CO₃ od roztworu Na₂SO₄ w jednej prostej próbie?",
    options: ["HCl(aq)", "NaCl(aq)", "KNO₃(aq)", "H₂O destylowana"],
    correctAnswer: 0,
    explanation: "Po dodaniu HCl do węglanu wydziela się CO₂, a z siarczanem(VI) sodu nie obserwuje się gazu.",
  },
  {
    topic: "Redoks i pierwiastki",
    question: "W reakcji Cl₂ + 2OH⁻ → Cl⁻ + ClO⁻ + H₂O chlor ulega:",
    options: ["wyłącznie utlenieniu", "wyłącznie redukcji", "dysproporcjonowaniu", "komproporcjonowaniu"],
    correctAnswer: 2,
    explanation: "Chlor na stopniu 0 przechodzi jednocześnie do −I w Cl⁻ oraz +I w ClO⁻. To reakcja dysproporcjonowania.",
  },
  {
    topic: "Elektrochemia",
    question: "W ogniwie Daniella Zn|Zn²⁺||Cu²⁺|Cu anodą jest elektroda: ",
    options: ["miedziana, bo ma wyższy potencjał standardowy", "cynkowa, bo zachodzi na niej utlenianie", "miedziana, bo zachodzi na niej redukcja", "cynkowa, bo przyjmuje elektrony"],
    correctAnswer: 1,
    explanation: "Na anodzie zachodzi utlenianie: Zn → Zn²⁺ + 2e⁻. Elektrony płyną od elektrody cynkowej do miedzianej.",
  },
  {
    topic: "Elektrochemia",
    question: "Podczas pracy ogniwa Zn|Zn²⁺||Cu²⁺|Cu masa elektrody miedzianej:",
    options: ["maleje", "nie zmienia się", "rośnie", "najpierw rośnie, potem maleje"],
    correctAnswer: 2,
    explanation: "Na katodzie zachodzi redukcja Cu²⁺ + 2e⁻ → Cu, więc miedź osadza się na elektrodzie i jej masa rośnie.",
  },
  {
    topic: "Elektrochemia",
    question: "Do roztworu AgNO₃ zanurzono płytkę miedzianą. Po pewnym czasie stwierdzono osad srebra. Co dzieje się ze stężeniem jonów Cu²⁺?",
    options: ["maleje", "rośnie", "pozostaje stałe", "najpierw maleje, potem rośnie"],
    correctAnswer: 1,
    explanation: "Miedź utlenia się: Cu → Cu²⁺ + 2e⁻, a Ag⁺ redukuje się do Ag. W roztworze przybywa jonów Cu²⁺.",
  },
  {
    topic: "Elektrochemia",
    question: "Podczas elektrolizy wodnego roztworu CuSO₄ z elektrodami grafitowymi na katodzie powstaje przede wszystkim:",
    options: ["O₂", "H₂", "Cu", "SO₂"],
    correctAnswer: 2,
    explanation: "Jony Cu²⁺ redukują się łatwiej niż woda: Cu²⁺ + 2e⁻ → Cu. Na anodzie utlenia się woda, wydzielając O₂.",
  },
  {
    topic: "Elektrochemia",
    question: "Która metoda najlepiej chroni żelazo przed korozją, nawet gdy powłoka zostanie miejscowo zarysowana?",
    options: ["Pokrycie cyną", "Pokrycie miedzią", "Cynkowanie", "Pokrycie lakierem bezbarwnym"],
    correctAnswer: 2,
    explanation: "Cynk jest mniej szlachetny od żelaza i działa jako anoda protektorowa, więc utlenia się zamiast Fe nawet po uszkodzeniu powłoki.",
  },
  {
    topic: "Elektrochemia",
    question: "Do elektrolizy stopionego NaCl użyto elektrod obojętnych. Jaki produkt powstaje na katodzie?",
    options: ["Na", "H₂", "Cl₂", "NaOH"],
    correctAnswer: 0,
    explanation: "W stopionym NaCl nie ma wody. Na katodzie redukują się kationy sodu: Na⁺ + e⁻ → Na.",
  },
  {
    topic: "Elektrochemia",
    question: "Jeśli E°(Ag⁺/Ag) = +0,80 V, a E°(Cu²⁺/Cu) = +0,34 V, standardowa SEM ogniwa Cu|Cu²⁺||Ag⁺|Ag wynosi:",
    options: ["+1,14 V", "+0,46 V", "−0,46 V", "−1,14 V"],
    correctAnswer: 1,
    explanation: "Katodą jest Ag⁺/Ag, anodą Cu²⁺/Cu. E°ogniwa = E°katody − E°anody = 0,80 − 0,34 = 0,46 V.",
  },
];

export const diagnosticTopics: QuizTopic[] = ["Atom i wiązania", "Kwasy, zasady i sole", "Redoks i pierwiastki", "Elektrochemia"];
