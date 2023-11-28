// Question Types
// 1. MCQs | Multiple Choice | single
// 2. boolean | true/false | single
// 3. MAQs | Multiple Answers | multiple

import { Topic } from '.'
import CodeSnippet1 from '../../assets/images/code-snippet-1.png'

export const penulisan: Topic = {
  topic: 'PILIHAN GANDA',
  level: 'Intermediate',
  totalQuestions: 17,
  totalScore: 100,
  totalTime: 2400,
  questions: [
    {
      question: 'Dalam sebuah definisi terdapat kosakata yang didefinisikan dengan istilah . . .',
      choices: ['Diferensiasi', 'Definiendium', 'Definiens', 'Verba Kopulatif'],
      type: 'MCQs',
      correctAnswers: ['Definiendium'],
      score: 5,
    },
    {
      question: 'Penjelasan atau uraian terhadap kosakata yang didefinisikan disebut dengan istilah . . .',
      choices: ['Diferensiasi', 'Definiendium', 'Definiens', 'Verba Kopulatif'],
      type: 'MCQs',
      correctAnswers: ['Definiens'],
      score: 5,
    },
    {
      question: 'Pembeda antara definiendium dengan definiens dalam definisi formal disebut dengan istilah . . .',
      choices: ['Asosiasi', 'Mutasi', 'Asimilasi', 'Diferensiasi'],
      type: 'MCQs',
      correctAnswers: ['Diferensiasi'],
      score: 5,
    },
    {
      question: 'Dalam definisi formal, verba kopulatif yang digunakan yakni . . .',
      choices: ['Adalah', 'Ialah', 'Merupakan', 'Antara lain'],
      type: 'MCQs',
      correctAnswers: ['Ialah'],
      score: 5,
    },
    {
      question: 'Dalam definisi nominal, verba kopulatif yang digunakan yakni . . .',
      choices: ['Adalah', 'Ialah', 'Merupakan', 'Antara lain'],
      type: 'MCQs',
      correctAnswers: ['Adalah'],
      score: 5,
    },
    {
      question: 'Dalam definisi operasional, verba kopulatif yang digunakan yakni . . . ',
      choices: ['adalah', 'Ialah', 'merupakan', 'Antara lain'],
      type: 'MCQs',
      correctAnswers: ['merupakan'],
      score: 5,
    },
    {
      question: 'Perhatikan kalimat berikut!\nMahasiswa ialah pelajar di perguruan tinggi.\nJenis definisi pada kalimat tersebut yakni . . .',
      choices: ['Definisi Formal', 'Definisi Nominal', 'Definisi Operasional', 'Definisi Sinonim'],
      type: 'MCQs',
      correctAnswers: ['Definisi Formal'],
      score: 5,
    },
    {
      question: 'Perhatikan kalimat berikut!\nBeras merupakan bagian integral, dapat dikatakan menjadi penciri dari budaya Austronesia, khususnya Austronesia bagian barat.\nJenis definisi dari kalimat tersebut yakni . . .',
      choices: ['Definisi Formal', 'Definisi Nominal', 'Definisi Operasional', 'Definisi Sinonim'],
      type: 'MCQs',
      correctAnswers: ['Definisi Operasional'],
      score: 5,
    },
    {
      question: 'Perhatikan kalimat berikut!\nSabar adalah kunci hidupku\nJenis definisi dari kalimat tersebut yakni . . .',
      choices: ['Definisi Formal', 'Definisi Nominal', 'Definisi Operasional', 'Definisi Sinonim'],
      type: 'MCQs',
      correctAnswers: ['Definisi Nominal'],
      score: 5,
    },
    {
      question: 'Dari materi yang telah Anda pelajari ada 3 jenis definisi yang telah dibahas yakni . . .',
      choices: ['Definisi Formal', 'Definisi Non Formal', 'Definisi Operasional', 'Definisi Nominal'],
      type: 'MAQs',
      correctAnswers: ['Definisi Formal', 'Definisi Operasional', 'Definisi Nominal'],
      score: 5,
    },
    {
      question: 'Definisi harus dapat dibolak-balikkan dengan hal yang didefinisikan.',
      choices: ['Benar', 'Salah'],
      type: 'boolean',
      correctAnswers: ['Benar'],
      score: 5,
    },
    {
      question: 'Definisi boleh bermakna negatif. Contoh: Unggas adalah hewan yang bukan binatang melata.',
      choices: ['Benar', 'Salah'],
      type: 'boolean',
      correctAnswers: ['Salah'],
      score: 5,
    },
    {
      question: 'Apa yang didefinisikan tidak boleh masuk ke dalam definisi. Misalnya: “logika adalah pengetahuan yang menerangkan hukum logika”.',
      choices: ['Benar', 'Salah'],
      type: 'boolean',
      correctAnswers: ['Benar'],
      score: 5,
    },
    {
      question: 'Definisi tidak boleh dinyatakan dalam bahasa yang kabur atau tidak jelas. Contoh: “Partai politik adalah sekumpulan orang yang memiliki tujuan untuk mendapatkan kursi”.',
      choices: ['Benar', 'Salah'],
      type: 'boolean',
      correctAnswers: ['Benar'],
      score: 5,
    },
    {
      question: 'Pasangkanlah pola berikut ini sesuai dengan jenis definisi yang tepat!',
      setA: ['Pola A = B', 'Pola A = A', 'Pola A = A B C'],
      setB: ['Definisi Operasional', 'Definisi Formal', 'Definisi Nominal'],
      correctPairs: [
        ['Pola A = B', 'Definisi Formal'],
        ['Pola A = A', 'Definisi Nominal'],
        ['Pola A = A B C', 'Definisi Operasional']
      ],
      type: 'matching',
      score: 10,
    },
    {
      question: 'Pasangkanlah jenis definisi berikut ini sesuai dengan konsep yang tepat!',
      setA: ['Definisi Sinonim', 'Definisi Simbolik', 'Definisi Etimologis', 'Definisi Stipulatif', 'Definisi Denotatif'],
      setB: [
        'Penjelasan ketika istilah (definiendium) tersebut sudah ada definisi ini “dapat” tetapi “tidak harus” dan bertentangan dengan kamus',
        'Penjelasan dengan cara memberikan persamaan pernyataan bentuk-bentuk',
        'Penjelasan makna yang sebenarnya',
        'Penjelasan dengan cara memberi persamaan kata yang lebih dimengerti',
        'Penjelasan dengan cara memberikan asal mula istilah'
      ],
      correctPairs: [
        ['Definisi Sinonim', 'Penjelasan dengan cara memberi persamaan kata yang lebih dimengerti'],
        ['Definisi Simbolik', 'Penjelasan dengan cara memberikan persamaan pernyataan bentuk-bentuk'],
        ['Definisi Etimologis', 'Penjelasan dengan cara memberikan asal mula istilah'],
        ['Definisi Stipulatif', 'Penjelasan ketika istilah (definiendium) tersebut sudah ada definisi ini “dapat” tetapi “tidak harus” dan bertentangan dengan kamus'],
        ['Definisi Denotatif', 'Penjelasan makna yang sebenarnya']
      ],
      type: 'matching',
      score: 10,
    },
    {
      question: 'Pasangkanlah kalimat-kalimat berikut ini dengan jenis definisi yang sesuai!',
      setA: [
        'Istriku adalah separuh jiwaku.',
        'Bolpoin adalah pena.',
        'Minum bermakna memasukkan air (benda cair) ke dalam mulut dan meneguknya.',
        'Memecahkan sama saja Anda membeli.',
        'Manusia berasal dari kata “manu” (sanskerta) “mans”(latin) yang berarti berpikir berakal budi atau (mampu menguasai makhluk lain).'
      ],
      setB: ['Definisi Etimologi', 'Definisi Sinonim', 'Definisi Simbolik', 'Definisi Denotatif', 'Definisi Stipulatif'],
      correctPairs: [
        ['Istriku adalah separuh jiwaku.', 'Definisi Simbolik'],
        ['Bolpoin adalah pena.', 'Definisi Sinonim'],
        ['Minum bermakna memasukkan air (benda cair) ke dalam mulut dan meneguknya.', 'Definisi Denotatif'],
        ['Memecahkan sama saja Anda membeli.', 'Definisi Stipulatif'],
        ['Manusia berasal dari kata “manu” (sanskerta) “mans”(latin) yang berarti berpikir berakal budi atau (mampu menguasai makhluk lain).', 'Definisi Etimologi']
      ],
      correctAnswers: [],
      type: 'matching',
      score: 10,
    }
  ],
};
