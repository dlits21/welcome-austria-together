export const getNiveaus = (level: string, code: string): string => {
    switch (level) {
        case 'beginner':
            switch (code) {
                case 'de': return 'Anfänger';
                case 'en': return 'Beginner';
                // ...other languages
                default: return 'Beginner';
        }
        case 'intermediate':
            switch (code) {
                case 'de': return 'Mittelstufe';
                case 'en': return 'Intermediate';
                // ...other languages
                default: return 'Intermediate';
        }
        case 'advanced':
            switch (code) {
                case 'de': return 'Fortgeschritten';
                case 'en': return 'Advanced';
                // ...other languages
                default: return 'Advanced';
        }
    }
};

export const getTab = (tab: string, code: string): string => {
    switch (tab) {
        case 'all':
            switch (code) {
                case 'de': return 'Alle';
                case 'en': return 'All';
                // ...other languages
                default: return 'All';
        }
        case 'courses':
            switch (code) {
                case 'de': return 'Kurse';
                case 'en': return 'Courses';
                // ...other languages
                default: return 'Courses';
        }
        case 'resources':
            switch (code) {
                case 'de': return 'Ressourcen';
                case 'en': return 'Resources';
                // ...other languages
                default: return 'Resources';
        }
        case 'exams':
                switch (code) {
                    case 'de': return 'Prüfungen';
                    case 'en': return 'Exams';
                    // ...other languages
                    default: return 'Exams';
            }

    }
};
