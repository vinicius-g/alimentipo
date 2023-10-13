var express = require("express");
var router = express.Router();

const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage });

const HomeControllerRead = require("../controllers/nao-cadastrado/navegacao/homeControllerRead");
const SobreRestricoesControllerRead = require("../controllers/nao-cadastrado/navegacao/sobreRestricaoControllerRead");
const ProdutoSemGlutenControllerRead = require("../controllers/nao-cadastrado/navegacao/semGlutenControllerRead");
const ProdutoVeganoControllerRead = require("../controllers/nao-cadastrado/navegacao/veganoControllerRead");
const ProdutoZeroAcucarControllerRead = require("../controllers/nao-cadastrado/navegacao/zeroAcucarControllerRead");
const ProdutoZeroLactoseControllerRead = require("../controllers/nao-cadastrado/navegacao/zeroLactoseControllerRead");
const ProdutoControllerRead = require("../controllers/nao-cadastrado/navegacao/produtoControllerRead");
const ProdutosDestacadosControllerRead = require("../controllers/nao-cadastrado/navegacao/produtosDestacadosControllerRead");
const LojaControllerRead = require("../controllers/nao-cadastrado/navegacao/lojaControllerRead");
const TermosPoliticasControllerRead = require("../controllers/nao-cadastrado/navegacao/termosPoliticasControllerRead");

const CadastroCompradorControllerRead = require("../controllers/nao-cadastrado/cadastro/cadastroCompradorControllerRead");
const CadastroCompradorControllerCreate = require("../controllers/nao-cadastrado/cadastro/cadastroCompradorControllerCreate");

const CadastroVendedorControllerRead = require("../controllers/nao-cadastrado/cadastro/cadastroVendedorControllerRead");
const CadastroVendedorControllerCreate = require("../controllers/nao-cadastrado/cadastro/cadastroVendedorControllerCreate");

const LoginControllerRead = require("../controllers/nao-cadastrado/login/loginControllerRead");
const LoginAuthControllerRead = require("../controllers/nao-cadastrado/login/loginAuthControllerRead");

const PerfilCompradorControllerRead = require("../controllers/cadastrado/perfil/perfilCompradorControllerRead");

const EditarPerfilCompradorControllerRead = require("../controllers/cadastrado/perfil/editarPerfilCompradorControllerRead");
const EditarPerfilCompradorControllerUpdate = require("../controllers/cadastrado/perfil/editarPerfilCompradorControllerUpdate");

const PerfilVendedorControllerRead = require("../controllers/cadastrado/perfil/perfilVendedorControllerRead");

const ProdutosFavoritosControllerRead = require("../controllers/cadastrado/produtos/produtosFavoritosControllerRead");

const LojasFavoritasControllerRead = require("../controllers/cadastrado/lojas/lojasFavoritasControllerRead");

const ImagemPerfilClienteControllerRead = require("../controllers/nao-cadastrado/imagens/imagemPerfilClienteControllerRead");
const ImagemPerfilLojaControllerRead = require("../controllers/nao-cadastrado/imagens/imagemPerfilLojaControllerRead");

const LogoutControllerRead = require("../controllers/cadastrado/perfil/logoutPerfilControllerRead");


const ValidacaoMiddleware = require("../middlewares/regrasValidacaoMiddleware");
const ValidacaoFormularioMiddleware = require("../middlewares/formulariosMiddleware");
const AutenticaoMiddleware = require("../middlewares/autenticacaoMiddleware");

router.get("/",
HomeControllerRead.acessarPagina);

router.get("/sobre-restricoes-alimentares",
SobreRestricoesControllerRead.acessarPagina);

router.get("/produtos-sem-gluten",
ProdutoSemGlutenControllerRead.acessarPagina);

router.get("/produtos-veganos",
ProdutoVeganoControllerRead.acessarPagina);

router.get("/produtos-zero-acucar",
ProdutoZeroAcucarControllerRead.acessarPagina);

router.get("/produtos-zero-lactose",
ProdutoZeroLactoseControllerRead.acessarPagina);

router.get("/produto-especifico",
ProdutoControllerRead.acessarPagina);

router.get("/produtos-destacados",
ProdutosDestacadosControllerRead.acessarPagina);

router.get("/loja/:lojaId",
LojaControllerRead.acessarPagina);

router.get("/termos-e-politicas",
TermosPoliticasControllerRead.acessarPagina);

router.get("/cadastro-comprador",
CadastroCompradorControllerRead.acessarPagina);

router.post("/cadastro-comprador",
upload.single("imagem_perfil"),
ValidacaoMiddleware.RegrasValidacaoCadastroComprador,
ValidacaoFormularioMiddleware.validacaoCadastroComprador,
AutenticaoMiddleware.criptografarSenhaComprador,
CadastroCompradorControllerCreate.cadastrarCliente);

router.get("/cadastro-vendedor",
CadastroVendedorControllerRead.acessarPagina);

router.post("/cadastro-vendedor",
upload.single("imagem_perfil"),
ValidacaoMiddleware.RegrasValidacaoCadastroVendedor,
ValidacaoFormularioMiddleware.validacaoCadastroVendedor,
AutenticaoMiddleware.criptografarSenhaVendedor,
CadastroVendedorControllerCreate.cadastrarLoja);

router.get("/login",
LoginControllerRead.acessarPagina);

router.post("/login",
ValidacaoFormularioMiddleware.validacaoLogin,
LoginAuthControllerRead.autenticarCliente);

router.get("/perfil-comprador",
AutenticaoMiddleware.validarTokenComprador,
PerfilCompradorControllerRead.acessarPagina);

router.get("/editar-comprador/:clienteId",
AutenticaoMiddleware.validarTokenComprador,
EditarPerfilCompradorControllerRead.acessarPagina);

router.post("/editar-comprador/:clienteId",
AutenticaoMiddleware.validarTokenComprador,
upload.single("imagem_perfil"),
ValidacaoMiddleware.RegrasValidacaoCadastroComprador,
ValidacaoFormularioMiddleware.validacaoCadastroEditarComprador,
AutenticaoMiddleware.criptografarSenhaEditarComprador,
EditarPerfilCompradorControllerUpdate.editarCliente);

router.get("/perfil-vendedor",
AutenticaoMiddleware.validarTokenVendedor,
PerfilVendedorControllerRead.acessarPagina);

router.get("/produtos-favoritos",
AutenticaoMiddleware.validarTokenComprador,
ProdutosFavoritosControllerRead.acessarPagina);

router.get("/lojas-favoritas",
AutenticaoMiddleware.validarTokenComprador,
LojasFavoritasControllerRead.acessarPagina);

router.get("/imagem/cliente/perfil/:clienteId",
ImagemPerfilClienteControllerRead.acessarImagem);

router.get("/imagem/loja/perfil/:lojaId",
ImagemPerfilLojaControllerRead.acessarImagem);

router.get("/logout",
LogoutControllerRead.acessarPagina);

module.exports = router;