# Cadastro de carros

**RF**
- Deve ser possível cadastrar um novo carro

**RN**
- Não deve ser possível cadastrar um carro com uma placa já existente
- O Carro deve ser cadastrado, por padrão, com dispobilidade.
- ** Apenas administradores podem cadastrar carros

# Listagem de carros

**RF**
- Deve ser possível listar os carros disponíveis
- Deve ser possível listar todos carros disponíveis pelo nome da categoria
- Deve ser possível listar todos carros disponíveis pelo nome da marca

**RN**
- O usuário não precisa estar logado no sistema

# Cadastro de especificações

**RF**
- Deve ser possível cadastrar uma especificação para um carro

**RN**
- Não deve ser possível cadastrar uma especificação para um carro não existente
- Não deve ser possível cadastrar uma especificação já existente para o mesmo carro
- Apenas administradores podem cadastrar especificações

# Cadastro de imagens do carro

**RF**
- Deve ser possível cadastrar a imagem do carro

**RNF**
- Utilizar multer para upload dos arquivos

**RN**
- O usuário deve poder cadastrar mais de uma imagem para o mesmo carro
- Apenas administradores podem cadastrar imagens

# Aluguel de carro

**RF**
- Deve ser possível cadastrar um aluguel

**RN**
- O aluguel deve ter duração mínima de 24 horas.
- Não deve ser possível cadastrar um novo aluguel caso já exista um aberto para o mesmo usuário
- Não deve ser possível cadastrar um novo aluguel caso já exista um aberto para o mesmo carro
- O usuário deve estar logado