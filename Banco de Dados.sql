create table hardDisk(
	id serial primary key not null,
	modelo varchar(50) not null
)

create table marca(
	id serial primary key not null,
	nome varchar(50) not null
)

create table memoria(
	id serial primary key not null,
	modelo varchar(50) not null
)

create table modelo(
	id serial primary key not null,
	nome varchar(50) not null
)

create table processador(
	id serial primary key not null,
	modelo varchar(50) not null
)

create table produto(
	id serial primary key not null,
	nome varchr(50) not null
)

create table projeto(
	id serial primary key not null,
	nome varchar(50) not null
)

create table responsavel(
	id serial primary key not null,
	nome varchar(50) not null
)

create table tipoproduto(
	id serial primary key not null,
	nome varchar(50) not null
)

create table usuario(
	id serial primary key not null,
	nome varchar(200) not null,
	usuario varchar(50) not null,
	senha varchar(200) not null
)

create table inventario.equipamentos(
id serial primary key not null,
nf int not null,
processo int not null,
idResponsavel int not null,
local varchar(255) not null,
dataCompra date not null,
utilizador varchar(255) not null,
idMarca int not null,
codigoDoacao int not null,
idTipoProduto int not null,
patrimonio varchar(50),
idProjeto int not null,
status boolean not null,
serviceTag varchar(50),
idMemoria int,
idProcessador int,
idHardDisk int,
office boolean,
observacao varchar(255),
idModelo int not null,
foreign key (idResponsavel) references responsavel (id),
foreign key (idTipoProduto) references tipoproduto (id),
foreign key (idMarca) references marca (id),
foreign key (idProjeto) references projeto (id),
foreign key (idMemoria) references memoria (id),
foreign key (idProcessador) references processador (id),
foreign key (idHardDisk) references hardDisk (id),
foreign key (idModelo) references modelo (id)
)