drop database tabelas;
create database tabelas;
use tabelas;

create table cliente(
id_cliente int auto_increment primary key ,
nome_cliente varchar(100) not null,
email_cliente varchar(100) not null,
senha_cliente varchar(20) not null
);

create table loja(
cnpj_loja varchar(18) not null primary key, 
nome_loja varchar(100) not null, 
email_loja varchar(100) not null,
senha_loja varchar(20) not null,
link_loja varchar(100),
endereco_loja varchar(200),
telefone_loja varchar (14) not null,
descricao_loja varchar(200) not null,
estoque_loja boolean,
online_ou_fisica integer not null, 
assinatura_loja  boolean, /*verifica se a loja esta com a assinatura ativa*/
tipo_assinatura_loja integer, /* Tipo da assinatura: 1 mês, 1 ano, etc*/
data_compra_assinatura date not null,
data_vencimento_assinatura date not null
);

create table restricao(
id_restricao int auto_increment primary key,
nome_restricao varchar(100) not null,
restricao_pai int /* restrições gerais podem conter restrições especificas. logo, restrições especificas tem uma restrição geral como pai*/
);

create table produto( 
id_produto int auto_increment primary key,
nome_produto varchar(100) not null,
descricao_produto varchar(200) not null,
link_produto varchar(100),
preco_produto decimal(5,2) not null,
estoque_produto boolean,
desconto_produto decimal(5,2),  /* porcentagem de desconto*/
cnpj_loja varchar(18) not null,
foreign key (cnpj_loja) references loja(cnpj_loja)
);

create table restricoes_produto( 
id_restricao int not null,
foreign key (id_restricao) references restricao(id_restricao),
id_produto int not null,
foreign key (id_produto) references produto(id_produto),
cnpj_loja varchar(18) not null,
foreign key (cnpj_loja) references loja(cnpj_loja)
);

create table restrições_loja( 
id_restricao int not null,
foreign key (id_restricao) references restricao(id_restricao),
cnpj_loja varchar(18) not null,
foreign key (cnpj_loja) references loja(cnpj_loja)
);

create table loja_favorita(
id_cliente int not null,
foreign key (id_cliente) references cliente(id_cliente),
cnpj_loja varchar(18) not null,
foreign key (cnpj_loja) references loja(cnpj_loja)
);

create table produto_favorito(
id_cliente int not null,
foreign key (id_cliente) references cliente(id_cliente),
id_produto int not null,
foreign key (id_produto) references produto(id_produto)
);