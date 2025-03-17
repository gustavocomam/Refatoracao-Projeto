# Alunos
- Gustavo Comam
- Lucas Porto

# Primeira Refatoração do Projeto utilizando o Singleton

## Visão Geral
Este projeto foi atualizado para implementar o padrão Singleton em diversos serviços (Service) do back-end. O Singleton garante que cada serviço tenha apenas uma única instância, reduzindo o consumo desnecessário de memória e melhorando o gerenciamento das dependências.

## Motivação da Refatoração
Antes da refatoração, os serviços eram gerenciados pelo Spring Boot usando @Service e @Autowired. Apesar de o Spring já tratar os serviços como Singletons, a injeção de dependência automática foi substituída por um Singleton manual, permitindo um controle mais explícito sobre a instância de cada serviço.

## Principais Alterações
- Removemos as anotações @Service e @Autowired dos serviços.
- Criamos uma instância única (INSTANCE) em cada serviço para garantir o Singleton.
- Adicionamos um método getInstance() para fornecer a instância única do serviço.
- Tornamos o construtor private, impedindo a criação de múltiplas instâncias.

## Como os Serviços Funcionam Agora
```
public class NomeDoService {
    private static NomeDoService INSTANCE;
    private final NomeDoRepository repository;

    private NomeDoService(NomeDoRepository repository) {
        this.repository = repository;
    }

    public static synchronized NomeDoService getInstance(NomeDoRepository repository) {
        if (INSTANCE == null) {
            INSTANCE = new NomeDoService(repository);
        }
        return INSTANCE;
    }
}
```
### Vantagens dessa abordagem:
- Evita múltiplas instâncias do mesmo serviço.
- Melhora a eficiência e o controle do ciclo de vida dos serviços.
- Substitui a injeção automática do Spring por um Singleton explícito.

# Segunda Refatoração do Projeto utilizando o Factory Method

## Visão Geral
Este projeto foi atualizado para implementar o padrão Factory Method nos Models, garantindo padronização, organização e melhor controle sobre a criação de objetos. Antes da refatoração, os objetos eram criados diretamente com new Class(...), o que podia levar a código duplicado e falta de controle na criação das instâncias. Agora, todas as instâncias são criadas utilizando Factories, tornando o código mais limpo e de fácil manutenção.

## Motivação da Refatoração
Antes da refatoração, os Models permitiam que qualquer parte do código instanciasse objetos diretamente. Isso poderia gerar inconsistências e dificultar a manutenção. Com o Factory Method, a criação de objetos agora segue um padrão único, facilitando testes, refatorações futuras e evitando duplicação de código.

## Principais Alterações
- Criamos classes Factory para cada Model (AppointmentsFactory, BarberFactory, etc.).
- Tornamos os construtores dos Models privados → Agora os objetos só podem ser criados pelas Factories.
- Adicionamos um método create() dentro dos Models → Esse método permite a criação controlada de instâncias.
- Centralizamos a lógica de criação nas Factories → Isso evita espalhar código de inicialização por toda a aplicação.

## Como os Models Funcionam Agora

### Antes da Refatoração (Instanciação direta)
```
Barber barber = new Barber("Carlos", 1, "12345678900", "senha123", false);
```
### Depois da Refatoração (Usando Factory Method)
```
Barber barber = BarberFactory.createRegularBarber("Carlos", 1, "12345678900", "senha123");
```

## Vantagens da Refatoração
- Maior controle sobre a criação de objetos.
- Código mais organizado e modular.
- Facilidade de manutenção e testes.
- Evita código repetitivo ao centralizar a criação em Factories.
