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
      question: 'Menulis dongeng adalah . . .',
      choices: ['Menyampaikan pesan dalam tulisan secara bervariatif', 'Menyampaikan pikiran dan perasaan cerita fantasi yang dapat diambil manfaatnya.', 'Menyampaikan ide secara kreatif melalui pembicaraan yang terstruktur.', 'Mengkomunikasikan pesan tersembunyi yang cukup sulit ditebak'],
      type: 'MCQs',
      correctAnswers: ['Menyampaikan pikiran dan perasaan cerita fantasi yang dapat diambil manfaatnya.'],
      score: 5,
    },
    {
      question: 'Alur dongeng umumnya . . .',
      choices: ['Maju', 'Menceritakan masa lalu', 'Campuran', 'Tak beraturan'],
      type: 'MCQs',
      correctAnswers: ['Maju'],
      score: 5,
    },
    {
      question: 'Unsur utama dari dongeng antara lain . . ',
      choices: ['Judul, alur, dan dialog', 'Alur, latar, dan dialog', 'Judul, tema, dan dialog', 'Alur, latar, dan penokohan'],
      type: 'MCQs',
      correctAnswers: ['Alur, latar, dan penokohan'],
      score: 5,
    },
    {
      question: 'Tokoh yang tidak wajib hadir dalam dongeng yakni . . .',
      choices: ['Tokoh antagonis', 'Tokoh jahat', 'Tokoh tritagonis', 'Tokoh protagonis'],
      type: 'MCQs',
      correctAnswers: ['Tokoh tritagonis'],
      score: 5,
    },
    {
      question: 'Sifat tokoh dalam dongeng menyerupai sifat . . .',
      choices: ['Batu', 'Tumbuhan', 'Unsur Kimia', 'Manusia'],
      type: 'MCQs',
      correctAnswers: ['Manusia'],
      score: 5,
    },
    {
      question: 'Tahap menciptakan dongeng antara lain . . .',
      choices: ['Tahap penentuan publikasi dongeng.', 'Tahap pasca menulis dongeng.', 'Tahap pramenulis dongeng.', 'Tahap menulis dongeng.'],
      type: 'MAQs',
      correctAnswers: ['Tahap pasca menulis dongeng.', 'Tahap pramenulis dongeng.', 'Tahap menulis dongeng.'],
      score: 5,
    },
    {
      question: 'Struktur dongeng yakni . . .',
      choices: ['Perkenalan', 'Komplikasi', 'Klimaks', 'Penyelesaian'],
      type: 'MAQs',
      correctAnswers: ['Perkenalan', 'Komplikasi', 'Klimaks', 'Penyelesaian'],
      score: 5,
    },
    {
      question: 'Fantasi dalam dongeng yakni yang membuat sedih anak-anak.',
      choices: ['Benar', 'Salah'],
      type: 'boolean',
      correctAnswers: ['Salah'],
      score: 5,
    },
    {
      question: 'Bahasa dalam dongeng yakni kata yang mengundang multitafsir',
      choices: ['Benar', 'Salah'],
      type: 'boolean',
      correctAnswers: ['Salah'],
      score: 5,
    },
    {
      question: 'Sifat tokoh cerita dibuat alami.',
      choices: ['Benar', 'Salah'],
      type: 'boolean',
      correctAnswers: ['Benar'],
      score: 5,
    },
    {
      "question": "Pasangkanlah tahap-tahap penulisan dongeng sesuai dengan pasangannya!",
      "setA": ["Penentuan jenis dongeng"],
      "setB": [
        "Tahap pramenulis dongeng",
        "Tahap menulis dongeng",
        "Tahap pascamenulis dongeng"
      ],
      "correctPairs": [['Penentuan jenis dongeng','Tahap pramenulis dongeng']],
      type: 'matching',
      "score": 7
    },
    {
      "question": "Pasangkanlah tahap-tahap penulisan dongeng sesuai dengan pasangannya!",
      "setA": ["Menulis Berdasarkan Konsep-Konsep sebelumnya"],
      "setB": [
        "Tahap pramenulis dongeng",
        "Tahap menulis dongeng",
        "Tahap pascamenulis dongeng"
      ],
      "correctPairs": [ ["Menulis Berdasarkan Konsep-Konsep sebelumnya","Tahap menulis dongeng"]],
      type: 'matching',
      "score": 7
    },
    {
      "question": "Pasangkanlah tahap-tahap penulisan dongeng sesuai dengan pasangannya!",
      "setA": ["Revisi Aspek Cerita"],
      "setB": [
        "Tahap pramenulis dongeng",
        "Tahap menulis dongeng",
        "Tahap pascamenulis dongeng"
      ],
      "correctPairs": [["Revisi Aspek Cerita","Tahap pascamenulis dongeng"]],
      type: 'matching',
      "score": 7
    },
    {
      "question": "Pasangkanlah tahap-tahap penulisan dongeng sesuai dengan pasangannya!",
      "setA": ["Konsep Latar"],
      "setB": [
        "Tahap pramenulis dongeng",
        "Tahap menulis dongeng",
        "Tahap pascamenulis dongeng"
      ],
      "correctPairs": [["Konsep Latar","Tahap pramenulis dongeng"]],
      type: 'matching',
      "score": 7
    },
    {
      "question": "Pasangkanlah tahap-tahap penulisan dongeng sesuai dengan pasangannya!",
      "setA": ["Revisi Aspek Ejaan"],
      "setB": [
        "Tahap pramenulis dongeng",
        "Tahap menulis dongeng",
        "Tahap pascamenulis dongeng"
      ],
      "correctPairs": [["Revisi Aspek Ejaan","Tahap pascamenulis dongeng"]],
      type: 'matching',
      "score": 7
    },
    {
      "question": "Pasangkanlah tahap-tahap penulisan dongeng sesuai dengan pasangannya!",
      "setA": ["Konsep Alur"],
      "setB": [
        "Tahap pramenulis dongeng",
        "Tahap menulis dongeng",
        "Tahap pascamenulis dongeng"
      ],
      "correctPairs": [["Konsep Alur","Tahap pramenulis dongeng"]],
      type: 'matching',
      "score": 7
    },
    {
      "question": "Pasangkanlah tahap-tahap penulisan dongeng sesuai dengan pasangannya!",
      "setA": ["Konsep Penokohan"],
      "setB": [
        "Tahap pramenulis dongeng",
        "Tahap menulis dongeng",
        "Tahap pascamenulis dongeng"
      ],
      "correctPairs": [["Konsep Penokohan","Tahap pramenulis dongeng"]],
      type: 'matching',
      "score": 8
    }   
  ],
};
