// Aptidão para empreendimentos agrícolas de grande porte
// N1 - PUC

// Área em estudo
var aoi = ee.FeatureCollection("users/nepzapufvjm/limites_mg");
var empty = ee.Image().byte();
var outline = empty.paint({
  featureCollection: aoi,
  color: 1,
  width: 3
});
Map.addLayer(outline, {palette: 'FF0000'}, 'AOI');

// Camadas explicativas ----------------------------------------------------
var palettes = require('users/gena/packages:palettes'); // outras palhetas de cores https://github.com/gee-community/ee-palettes

// Solos
var solos_afloramento = ee.Image("users/nepzapufvjm/bandas/solos_afloramento").clip(aoi).rename('solos_afloramento');
var solos_argissoloamarelo = ee.Image("users/nepzapufvjm/bandas/solos_argissoloamarelo").clip(aoi).rename('solos_argissoloamarelo');
var solos_argissolovermelho = ee.Image("users/nepzapufvjm/bandas/solos_argissolovermelho").clip(aoi).rename('solos_argissolovermelho');
var solos_argissolovermelhoamarelo = ee.Image("users/nepzapufvjm/bandas/solos_argissolovermelhoamarelo").clip(aoi).rename('solos_argissolovermelhoamarelo');
var solos_cambissolo = ee.Image("users/nepzapufvjm/bandas/solos_cambissolo").clip(aoi).rename('solos_cambissolo');
var solos_chernossolo = ee.Image("users/nepzapufvjm/bandas/solos_chernossolo").clip(aoi).rename('solos_chernossolo');
var solos_espodossolo = ee.Image("users/nepzapufvjm/bandas/solos_espodossolo").clip(aoi).rename('solos_espodossolo');
var solos_gleissolo = ee.Image("users/nepzapufvjm/bandas/solos_gleissolo").clip(aoi).rename('solos_gleissolo');
var solos_latossoloamarelo = ee.Image("users/nepzapufvjm/bandas/solos_latossoloamarelo").clip(aoi).rename('solos_latossoloamarelo');
var solos_latossolovermelho = ee.Image("users/nepzapufvjm/bandas/solos_latossolovermelho").clip(aoi).rename('solos_latossolovermelho');
var solos_latossolovermelhoamarelo = ee.Image("users/nepzapufvjm/bandas/solos_latossolovermelhoamarelo").clip(aoi).rename('solos_latossolovermelhoamarelo');
var solos_neossolo = ee.Image("users/nepzapufvjm/bandas/solos_neossolo").clip(aoi).rename('solos_neossolo');
var solos_neossoloquartzarenico = ee.Image("users/nepzapufvjm/bandas/solos_neossoloquartzarenico").clip(aoi).rename('solos_neossoloquartzarenico');
var solos_nitossolo = ee.Image("users/nepzapufvjm/bandas/solos_nitossolo").clip(aoi).rename('solos_nitossolo');
var solos_planossolo = ee.Image("users/nepzapufvjm/bandas/solos_planossolo").clip(aoi).rename('solos_planossolo');
var solos_plintossolo = ee.Image("users/nepzapufvjm/bandas/solos_plintossolo").clip(aoi).rename('solos_plintossolo');
var solos_vertissolo = ee.Image("users/nepzapufvjm/bandas/solos_vertissolo").clip(aoi).rename('solos_vertissolo');

// Geologia
var geo_associacoes_meta_psamitico_meta_pelitico = ee.Image("users/nepzapufvjm/bandas/geo_associacoes_meta_psamitico_meta_pelitico").clip(aoi).rename('geo_associacoes_meta_psamitico_meta_pelitico');
var geo_rochas_igneas_composicao_felsica = ee.Image("users/nepzapufvjm/bandas/geo_rochas_igneas_composicao_felsica").clip(aoi).rename('geo_rochas_igneas_composicao_felsica');
var geo_rochas_metamorficas_com_xistosidade = ee.Image("users/nepzapufvjm/bandas/geo_rochas_metamorficas_com_xistosidade").clip(aoi).rename('geo_rochas_metamorficas_com_xistosidade');
var geo_associacoes_metapeliticas_a_metapsamitica= ee.Image("users/nepzapufvjm/bandas/geo_associacoes_metapeliticas_a_metapsamitica").clip(aoi).rename('geo_associacoes_metapeliticas_a_metapsamitica');
var geo_formacao_ferrifera_bandada_bifs= ee.Image("users/nepzapufvjm/bandas/geo_formacao_ferrifera_bandada_bifs").clip(aoi).rename('geo_formacao_ferrifera_bandada_bifs');
var geo_rochas_meta_carbonaticas= ee.Image("users/nepzapufvjm/bandas/geo_rochas_meta_carbonaticas").clip(aoi).rename('geo_rochas_meta_carbonaticas');
var geo_rochas_meta_maficas_a_ultramaficas= ee.Image("users/nepzapufvjm/bandas/geo_rochas_meta_maficas_a_ultramaficas").clip(aoi).rename('geo_rochas_meta_maficas_a_ultramaficas');
var geo_rochas_metamorficas_de_composicao_felsica= ee.Image("users/nepzapufvjm/bandas/geo_rochas_metamorficas_de_composicao_felsica").clip(aoi).rename('geo_rochas_metamorficas_de_composicao_felsica');
var geo_rochas_metamorficas_de_composicao_mafica= ee.Image("users/nepzapufvjm/bandas/geo_rochas_metamorficas_de_composicao_mafica").clip(aoi).rename('geo_rochas_metamorficas_de_composicao_mafica');
var geo_rochas_metapsamiticas= ee.Image("users/nepzapufvjm/bandas/geo_rochas_metapsamiticas").clip(aoi).rename('geo_rochas_metapsamiticas');
var geo_sedimentos_inconsolidados_cobertura_detrito_lateritica= ee.Image("users/nepzapufvjm/bandas/geo_sedimentos_inconsolidados_cobertura_detrito_lateritica").clip(aoi).rename('geo_sedimentos_inconsolidados_cobertura_detrito_lateritica');

// Relevo -------------
var TAGEE = require('users/zecojls/TAGEE:TAGEE-functions');
var srtm = ee.Image("USGS/SRTMGL1_003").clip(aoi);
var Slope = TAGEE.terrainAnalysis(TAGEE, srtm, aoi).select('Slope');


// Criar stack das camadas --------------------------------------------------
var layersExplanatory = Slope;
layersExplanatory = layersExplanatory.addBands(solos_afloramento);
layersExplanatory = layersExplanatory.addBands(solos_argissoloamarelo);
layersExplanatory = layersExplanatory.addBands(solos_argissolovermelho);
layersExplanatory = layersExplanatory.addBands(solos_argissolovermelhoamarelo);
layersExplanatory = layersExplanatory.addBands(solos_cambissolo);
layersExplanatory = layersExplanatory.addBands(solos_chernossolo);
layersExplanatory = layersExplanatory.addBands(solos_espodossolo);
layersExplanatory = layersExplanatory.addBands(solos_gleissolo);
layersExplanatory = layersExplanatory.addBands(solos_latossoloamarelo);
layersExplanatory = layersExplanatory.addBands(solos_latossolovermelho);
layersExplanatory = layersExplanatory.addBands(solos_latossolovermelhoamarelo);
layersExplanatory = layersExplanatory.addBands(solos_neossolo);
layersExplanatory = layersExplanatory.addBands(solos_neossoloquartzarenico);
layersExplanatory = layersExplanatory.addBands(solos_nitossolo);
layersExplanatory = layersExplanatory.addBands(solos_planossolo);
layersExplanatory = layersExplanatory.addBands(solos_plintossolo);
layersExplanatory = layersExplanatory.addBands(solos_vertissolo);
layersExplanatory = layersExplanatory.addBands(geo_rochas_metamorficas_com_xistosidade);
layersExplanatory = layersExplanatory.addBands(geo_rochas_igneas_composicao_felsica);
layersExplanatory = layersExplanatory.addBands(geo_associacoes_meta_psamitico_meta_pelitico);
layersExplanatory = layersExplanatory.addBands(geo_sedimentos_inconsolidados_cobertura_detrito_lateritica);
layersExplanatory = layersExplanatory.addBands(geo_rochas_metapsamiticas);
layersExplanatory = layersExplanatory.addBands(geo_rochas_metamorficas_de_composicao_mafica);
layersExplanatory = layersExplanatory.addBands(geo_rochas_metamorficas_de_composicao_felsica);
layersExplanatory = layersExplanatory.addBands(geo_rochas_meta_maficas_a_ultramaficas);
layersExplanatory = layersExplanatory.addBands(geo_rochas_meta_carbonaticas);
layersExplanatory = layersExplanatory.addBands(geo_formacao_ferrifera_bandada_bifs);

print(layersExplanatory.bandNames());

// Adiciona camada na visualização
//Map.addLayer(layersExplanatory.select('Slope'), {min: 0, max: 150}, 'Slope', true);


// Cria camada com as amostras de treinamento -------------------------------
var referencias = ee.FeatureCollection("users/nepzapufvjm/campodm");
print(referencias);
Map.addLayer(referencias,{},'Amostras', true);

var bandas = ['Slope',  
              'solos_argissoloamarelo', 
              'solos_argissolovermelho', 'solos_argissolovermelhoamarelo', 'solos_cambissolo',
              'solos_chernossolo','solos_espodossolo','solos_gleissolo', 'solos_latossoloamarelo',
              'solos_latossolovermelho', 'solos_latossolovermelhoamarelo', 'solos_neossolo', 'solos_neossoloquartzarenico',
              'solos_nitossolo', 'solos_planossolo','solos_plintossolo', 'solos_vertissolo',
              'geo_rochas_metamorficas_com_xistosidade', 
              'geo_rochas_igneas_composicao_felsica', 
              'geo_associacoes_meta_psamitico_meta_pelitico','geo_sedimentos_inconsolidados_cobertura_detrito_lateritica',
              'geo_rochas_metapsamiticas', 'geo_rochas_metamorficas_de_composicao_mafica',
              'geo_rochas_metamorficas_de_composicao_felsica', 'geo_rochas_meta_maficas_a_ultramaficas',
              'geo_rochas_meta_carbonaticas', 'geo_formacao_ferrifera_bandada_bifs'
              ]

// une o cubo com os valores de referência para projetos agrícolas de grande porte
var treinamento = layersExplanatory.select(bandas).sampleRegions({
   collection:referencias,
   properties:['ag'], //seleciona coluna com valores 0 ou 1 para treinamento
   scale: 10
});

//print(treinamento);

// treinamento de uma randomForest baseado no potencial para projeto agrícolas grandes considerando camadas do cubo
var classificador = ee.Classifier.smileRandomForest(500).train({
 features: treinamento,
 classProperty: 'ag',
 inputProperties: bandas
});

// aplicar o classificador para projetos agrícolas de grande porte na área de estudo
var classificacao = layersExplanatory.select(bandas).classify(classificador);
Map.addLayer(classificacao.clip(aoi),
  {min:0, max:1, palette:['red', 'green']},
  'Classificação');


var kernel = ee.Kernel.circle({radius: 1});
var classificacaoComFiltro = classificacao.focalMin({kernel: kernel, iterations: 5}).focalMax({kernel: kernel, iterations: 3});
Map.addLayer(classificacaoComFiltro.clip(aoi),
 {min:0, max:1, palette:['red', 'green']},
 'ClassFinal');
 
 //var apertClassificacao = erodeClassificacao.focal_max({kernel: kernel, iteration: 2});

// Exportar
Export.image.toDrive({ image: classificacaoComFiltro.clip(aoi), description: 'n1_gr_agr ', 
scale: 30, maxPixels: 1338738636, region: aoi, folder: 'fapemig_mapeamento'});

// Variavel importância _ 
var dict_featImportance = classificador.explain();
print(dict_featImportance, 'dict_featImportance');
// Cast into a ee.Feature and a ee.FeatureCollection for exporting the importance as CSV
var variable_importance = ee.Feature(null, ee.Dictionary(dict_featImportance).get('importance'));
var variable_importance01 = ee.FeatureCollection(variable_importance);
// Export the FeatureCollection as CSV
Export.table.toDrive({collection: variable_importance01, description: 'n5_g_agr', fileFormat: 'CSV', folder: 'fapemig_mapeamento'})

