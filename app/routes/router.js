var express = require("express");
var router = express.Router();

const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage });

const HomeControllerRead = require("../controllers/nao-cadastrado/navegacao/homeControllerRead");
const SobreRestricoesControllerRead = require("../controllers/nao-cadastrado/navegacao/sobreRestricaoControllerRead");

const ProdutoSemGlutenControllerRead = require("../controllers/nao-cadastrado/navegacao/semGlutenControllerRead");
const ProdutosSemGlutenPesquisaControllerRead = require("../controllers/nao-cadastrado/navegacao/semGlutenPesquisaControllerRead");

const ProdutoVeganoControllerRead = require("../controllers/nao-cadastrado/navegacao/veganoControllerRead");
const ProdutosVeganosPesquisaControllerRead = require("../controllers/nao-cadastrado/navegacao/veganoPesquisaControllerRead");

const ProdutoZeroAcucarControllerRead = require("../controllers/nao-cadastrado/navegacao/zeroAcucarControllerRead");
const ProdutosZeroAcucarPesquisaControllerRead = require("../controllers/nao-cadastrado/navegacao/zeroAcucarPesquisaControllerRead");

const ProdutoZeroLactoseControllerRead = require("../controllers/nao-cadastrado/navegacao/zeroLactoseControllerRead");
const ProdutosZeroLactosePesquisaControllerRead = require("../controllers/nao-cadastrado/navegacao/zeroLactosePesquisaControllerRead");

const ProdutoControllerRead = require("../controllers/nao-cadastrado/navegacao/produtoControllerRead");
const FavoritarProdutoControllerUpdate = require("../controllers/nao-cadastrado/navegacao/favoritarProdutoControllerUpdate");
const ProdutosDestacadosControllerRead = require("../controllers/nao-cadastrado/navegacao/produtosDestacadosControllerRead");
const ProdutosDestacadosPesquisaControllerRead = require("../controllers/nao-cadastrado/navegacao/produtosDestacadosPesquisaControllerRead");

const LojaControllerRead = require("../controllers/nao-cadastrado/navegacao/lojaControllerRead");
const FavoritarLojaControllerUpdate = require("../controllers/nao-cadastrado/navegacao/favoritarLojaControllerUpdate");

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
const DeletarPerfilCompradorControllerRead = require("../controllers/cadastrado/perfil/deletarPerfilCompradorControllerRead");
const DeletarPerfilCompradorControllerDelete = require("../controllers/cadastrado/perfil/deletarPerfilCompradorControllerDelete");

const PerfilVendedorControllerRead = require("../controllers/cadastrado/perfil/perfilVendedorControllerRead");

const EditarPerfilVendedorControllerRead = require("../controllers/cadastrado/perfil/editarPerfilVendedorControllerRead");
const EditarPerfilVendedorControllerUpdate = require("../controllers/cadastrado/perfil/editarPerfilVendedorControllerUpdate");
const DeletarPerfilVendedorControllerRead = require("../controllers/cadastrado/perfil/deletarPerfilVendedorControllerRead");
const DeletarPerfilVendedorControllerDelete = require("../controllers/cadastrado/perfil/deletarPerfilVendedorControllerDelete");

const PublicarProdutoControllerRead = require("../controllers/cadastrado/produtos/publicarProdutoControllerRead");
const PublicarProdutoControllerCreate = require("../controllers/cadastrado/produtos/publicarProdutoControllerCreate");
const EditarProdutoControllerUpdate = require("../controllers/cadastrado/produtos/editarProdutoControllerUpdate");
const DeletarProdutoControllerDelete = require("../controllers/cadastrado/produtos/deletarProdutoControllerDelete");

const ProdutosFavoritosControllerRead = require("../controllers/cadastrado/produtos/produtosFavoritosControllerRead");

const LojasFavoritasControllerRead = require("../controllers/cadastrado/lojas/lojasFavoritasControllerRead");

const ImagemPerfilClienteControllerRead = require("../controllers/nao-cadastrado/imagens/imagemPerfilClienteControllerRead");
const ImagemPerfilLojaControllerRead = require("../controllers/nao-cadastrado/imagens/imagemPerfilLojaControllerRead");
const ImagemProdutoControllerRead = require("../controllers/nao-cadastrado/imagens/imagemProdutoControllerRead");

const LogoutControllerRead = require("../controllers/cadastrado/perfil/logoutPerfilControllerRead");

const minhaAssinaturaControllerRead = require("../controllers/cadastrado/lojas/minhaAssinaturaControllerRead");
const adicionarAssinaturaLojaControllerUpdate = require("../controllers/cadastrado/lojas/adicionarAssinaturaLojaControllerUpdate");
const removerAssinaturaLojaControllerUpdate = require("../controllers/cadastrado/lojas/removerAssinaturaLojaControllerUpdate");

const ValidacaoMiddleware = require("../middlewares/regrasValidacaoMiddleware");
const ValidacaoFormularioMiddleware = require("../middlewares/formulariosMiddleware");
const AutenticaoMiddleware = require("../middlewares/autenticacaoMiddleware");

router.get("/",
HomeControllerRead.acessarPagina);

router.get("/sobre-restricoes-alimentares",
SobreRestricoesControllerRead.acessarPagina);

router.get("/produtos-sem-gluten/:paginaProduto",
ProdutoSemGlutenControllerRead.acessarPagina);

router.get("/pesquisa-produtos-sem-gluten/:paginaProduto",
ProdutosSemGlutenPesquisaControllerRead.acessarPagina);

router.get("/produtos-veganos/:paginaProduto",
ProdutoVeganoControllerRead.acessarPagina);

router.get("/pesquisa-produtos-veganos/:paginaProduto",
ProdutosVeganosPesquisaControllerRead.acessarPagina);

router.get("/produtos-zero-acucar/:paginaProduto",
ProdutoZeroAcucarControllerRead.acessarPagina);

router.get("/pesquisa-produtos-zero-acucar/:paginaProduto",
ProdutosZeroAcucarPesquisaControllerRead.acessarPagina);

router.get("/produtos-zero-lactose/:paginaProduto",
ProdutoZeroLactoseControllerRead.acessarPagina);

router.get("/pesquisa-produtos-zero-lactose/:paginaProduto",
ProdutosZeroLactosePesquisaControllerRead.acessarPagina);

router.get("/produto/:produtoId",
ProdutoControllerRead.acessarPagina);

router.post("/favoritar-produto/:produtoId",
FavoritarProdutoControllerUpdate.favoritarProduto);

router.get("/produtos-destacados/:paginaProduto",
ProdutosDestacadosControllerRead.acessarPagina);

router.get("/pesquisa-produtos-destacados/:paginaProduto",
ProdutosDestacadosPesquisaControllerRead.acessarPagina);

router.get("/loja/:lojaId",
LojaControllerRead.acessarPagina);

router.post("/favoritar-loja/:lojaId",
FavoritarLojaControllerUpdate.favoritarLoja);

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

router.get("/deletar-comprador/:clienteId",
AutenticaoMiddleware.validarTokenComprador,
DeletarPerfilCompradorControllerRead.acessarPagina);

router.post("/deletar-comprador/:clienteId",
AutenticaoMiddleware.validarTokenComprador,
ValidacaoFormularioMiddleware.validacaoDeletarPerfilComprador,
DeletarPerfilCompradorControllerDelete.deleteUser);

router.get("/perfil-vendedor",
AutenticaoMiddleware.validarTokenVendedor,
PerfilVendedorControllerRead.acessarPagina);

router.get("/editar-vendedor/:lojaId",
AutenticaoMiddleware.validarTokenVendedor,
EditarPerfilVendedorControllerRead.acessarPagina);

router.post("/editar-vendedor/:lojaId",
AutenticaoMiddleware.validarTokenVendedor,
upload.single("imagem_perfil"),
ValidacaoMiddleware.RegrasValidacaoCadastroVendedor,
ValidacaoFormularioMiddleware.validacaoCadastroEditarVendedor,
EditarPerfilVendedorControllerUpdate.editarLoja);

router.get("/deletar-vendedor/:lojaId",
AutenticaoMiddleware.validarTokenVendedor,
DeletarPerfilVendedorControllerRead.acessarPagina);

router.post("/deletar-vendedor/:lojaId",
AutenticaoMiddleware.validarTokenVendedor,
ValidacaoFormularioMiddleware.validacaoDeletarPerfilVendedor,
DeletarPerfilVendedorControllerDelete.deleteUser);

router.get("/publicar-produto",
AutenticaoMiddleware.validarTokenVendedor,
PublicarProdutoControllerRead.acessarPagina);

router.post("/publicar-produto",
AutenticaoMiddleware.validarTokenVendedor,
upload.single("imagem_produto"),
ValidacaoMiddleware.RegrasValidacaoCadastroProduto,
ValidacaoFormularioMiddleware.validacaoCadastroProduto,
PublicarProdutoControllerCreate.cadastrarProduto);

router.post("/editar-produto/:produtoId",
AutenticaoMiddleware.validarTokenVendedor,
ValidacaoMiddleware.RegrasValidacaoEditarProduto,
ValidacaoFormularioMiddleware.validacaoEditarProduto,
EditarProdutoControllerUpdate.editarProduto)

router.post("/deletar-produto/:produtoId",
AutenticaoMiddleware.validarTokenVendedor,
DeletarProdutoControllerDelete.deleteProduto);

router.get("/minha-assinatura",
AutenticaoMiddleware.validarTokenVendedor,
minhaAssinaturaControllerRead.acessarPagina);

router.get("/adicionar-assinatura/:lojaId",
AutenticaoMiddleware.validarTokenVendedor,
adicionarAssinaturaLojaControllerUpdate.updateUserPremium);

router.get("/remover-assinatura/:lojaId",
AutenticaoMiddleware.validarTokenVendedor,
removerAssinaturaLojaControllerUpdate.updateUserPremium);

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

router.get("/imagem/produto/:produtoId",
ImagemProdutoControllerRead.acessarImagem)

router.get("/logout",
LogoutControllerRead.acessarPagina);

module.exports = router;