import { Post } from '../models/post';

export class PostRepository {
    private posts: Post[] = [];
    private nextId: number = 1;

    // Método para criar novo post
    public add(post: Post): Post {
        post['id'] = this.nextId++;
        this.posts.push(post);
        return post;
    }

    // Método para atualizar post existente
    public update(id: number, title: string, content: string, date: Date, likes: number): boolean {
        const post = this.findById(id);
        if (post) {
            post['title'] = title;
            post['content'] = content;
            post['date'] = date;
            post['likes'] = likes;
            return true;
        }
        return false;
    }

    // Método para buscar post por id
    public findById(id: number): Post | undefined {
        return this.posts.find(post => post.getId() === id);
    }

    // Método para deletar post por id
    public delete(id: number): boolean {
        const index = this.posts.findIndex(post => post.getId() === id);
        if (index !== -1) {
            this.posts.splice(index, 1);
            return true;
        }
        return false;
    }

    // Método para curtir um post
    public like(id: number): number | null {
        const post = this.findById(id);
        if (post) {
            post['likes'] = post.getLikes() + 1;
            return post.getLikes();
        }
        return null;
    }

    // Método para gerar data aleatória
    private generateRandomDate(yearsBack: number = 5): Date {
        const today = new Date();
        const startYear = today.getFullYear() - yearsBack;
        const randomYear = Math.floor(Math.random() * (today.getFullYear() - startYear)) + startYear;
        const randomMonth = Math.floor(Math.random() * 12);
        const randomDay = Math.floor(Math.random() * 28) + 1; // Usando 28 dias para evitar problemas com fevereiro
        return new Date(randomYear, randomMonth, randomDay);
    }

    // Método para povoar base de dados de posts
    public populate(): void {
        this.add(new Post(
            1,
            'A Importância da Educação',
            'A educação é a base para uma sociedade mais justa e equitativa. ' +
            'Ela promove o desenvolvimento individual e coletivo, ' +
            'permitindo que pessoas realizem seu potencial. ' +
            'Investir em educação é investir no futuro de todos nós.',
            this.generateRandomDate(),
            10
        ));
        this.add(new Post(
            2,
            'Tecnologia e Inovação',
            'Vivemos em uma era onde a tecnologia avança a passos largos. ' +
            'Inovações constantes estão mudando a forma como vivemos, trabalhamos e nos comunicamos. ' +
            'É essencial acompanhar essas mudanças para não ficarmos para trás. ' +
            'A tecnologia tem o poder de transformar o mundo em que vivemos.',
            this.generateRandomDate(),
            15
        ));
        this.add(new Post(
            3,
            'Sustentabilidade Ambiental',
            'Preservar o meio ambiente é crucial para o futuro das próximas gerações. ' +
            'Cada ação nossa tem um impacto, e precisamos ser conscientes das nossas escolhas. ' +
            'A sustentabilidade não é uma opção, mas uma necessidade urgente. ' +
            'Devemos agir agora para garantir um planeta habitável no futuro.',
            this.generateRandomDate(),
            20
        ));
        this.add(new Post(
            4,
            'Saúde e Bem-Estar',
            'Manter o bem-estar físico e mental é essencial para uma vida equilibrada. ' +
            'O cuidado com a saúde deve ser uma prioridade diária. ' +
            'Pequenos hábitos saudáveis podem fazer uma grande diferença a longo prazo. ' +
            'Não negligencie seu bem-estar, ele é a chave para uma vida plena.',
            this.generateRandomDate(),
            8
        ));
        this.add(new Post(
            5,
            'Economia Digital',
            'A transformação digital está mudando a maneira como fazemos negócios. ' +
            'Empresas que não se adaptam a essa nova realidade correm o risco de ficar obsoletas. ' +
            'A digitalização não é apenas uma tendência, mas uma necessidade para a sobrevivência no mercado. ' +
            'O futuro é digital, e devemos nos preparar para ele.',
            this.generateRandomDate(),
            12
        ));
        this.add(new Post(
            6,
            'Impacto das Redes Sociais',
            'As redes sociais têm um papel central na comunicação moderna. ' +
            'Elas conectam pessoas em todo o mundo, criando novas formas de interação. ' +
            'No entanto, também trazem desafios, como a disseminação de informações falsas. ' +
            'É crucial usar essas ferramentas de forma responsável e consciente.',
            this.generateRandomDate(),
            7
        ));
        this.add(new Post(
            7,
            'Mobilidade Urbana',
            'Soluções de mobilidade inteligente são o futuro das grandes cidades. ' +
            'O crescimento populacional exige novas abordagens para o transporte urbano. ' +
            'A integração de tecnologia no transporte pode melhorar a qualidade de vida nas cidades. ' +
            'Investir em mobilidade sustentável é essencial para um futuro melhor.',
            this.generateRandomDate(),
            9
        ));
        this.add(new Post(
            8,
            'Educação Financeira',
            'Gerir as finanças pessoais é fundamental para a estabilidade econômica. ' +
            'A educação financeira deve começar desde cedo, para evitar problemas no futuro. ' +
            'Entender como o dinheiro funciona é o primeiro passo para uma vida financeira saudável. ' +
            'Planejamento e controle são as chaves para o sucesso financeiro.',
            this.generateRandomDate(),
            5
        ));
        this.add(new Post(
            9,
            'Alimentação Saudável',
            'Uma dieta equilibrada é essencial para manter corpo e mente saudáveis. ' +
            'Os alimentos que consumimos impactam diretamente nossa saúde e bem-estar. ' +
            'Fazer escolhas alimentares conscientes pode prevenir doenças e melhorar a qualidade de vida. ' +
            'Invista em uma alimentação rica em nutrientes e pobre em alimentos processados.',
            this.generateRandomDate(),
            11
        ));
        this.add(new Post(
            10,
            'Inovações na Saúde',
            'A tecnologia está revolucionando o setor de saúde com novos tratamentos. ' +
            'Inovações como a telemedicina estão tornando o atendimento mais acessível. ' +
            'A pesquisa e o desenvolvimento em saúde estão em um ritmo acelerado, trazendo esperança para muitas doenças. ' +
            'O futuro da saúde está cada vez mais integrado com a tecnologia.',
            this.generateRandomDate(),
            13
        ));
    }

    // Método para listar posts
    public list(): Post[] {
        return this.posts.sort((a, b) => b.getDate().getTime() - a.getDate().getTime());
    }
}