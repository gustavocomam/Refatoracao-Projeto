# Alunos
- Gustavo Comam
- Lucas Porto

# Refatoração do Projeto com Singleton

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
```public class NomeDoService {
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
