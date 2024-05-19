// Aptidão para empreendimentos agrícolas de grande porte
// N2 

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

// Clima ----------

var clima = ee.ImageCollection("IDAHO_EPSCOR/TERRACLIMATE")
  .filter(ee.Filter.date('2019-01-01', '2022-01-01'))
  .filter(ee.Filter.bounds(aoi))
  .median();
clima = clima.select('def', 'pdsi', 'vs', 'vpd', 'vap', 'aet', 'pet', 'srad').clip(aoi);

// Bioclimaticas
var WC2_amplit_term_anual = ee.Image("users/nepzapufvjm/bandas/WC2_amplit_term_anual").clip(aoi).rename('WC2_amplit_term_anual');
var WC2_isotermalidade = ee.Image("users/nepzapufvjm/bandas/WC2_isotermalidade").clip(aoi).rename('WC2_isotermalidade');
var WC2_osc_term_dia = ee.Image("users/nepzapufvjm/bandas/WC2_osc_term_dia").clip(aoi).rename('WC2_osc_term_dia');
var WC2_prec_anual = ee.Image("users/nepzapufvjm/bandas/WC2_prec_anual").clip(aoi).rename('WC2_prec_anual');
var WC2_prec_mesmaisseco = ee.Image("users/nepzapufvjm/bandas/WC2_prec_mesmaisseco").clip(aoi).rename('WC2_prec_mesmaisseco');
var WC2_prec_mesmaisumido = ee.Image("users/nepzapufvjm/bandas/WC2_prec_mesmaisumido").clip(aoi).rename('WC2_prec_mesmaisumido');
var WC2_prec_trimaisfrio = ee.Image("users/nepzapufvjm/bandas/WC2_prec_trimaisfrio").clip(aoi).rename('WC2_prec_trimaisfrio');
var WC2_prec_trimaisquente = ee.Image("users/nepzapufvjm/bandas/WC2_prec_trimaisquente").clip(aoi).rename('WC2_prec_trimaisquente');
var WC2_prec_trimaisseco = ee.Image("users/nepzapufvjm/bandas/WC2_prec_trimaisseco").clip(aoi).rename('WC2_prec_trimaisseco');
var WC2_prec_trimaisumido = ee.Image("users/nepzapufvjm/bandas/WC2_prec_trimaisumido").clip(aoi).rename('WC2_prec_trimaisumido');
var WC2_sazo_pre = ee.Image("users/nepzapufvjm/bandas/WC2_sazo_pre").clip(aoi).rename('WC2_sazo_pre');
var WC2_sazo_temp = ee.Image("users/nepzapufvjm/bandas/WC2_sazo_temp").clip(aoi).rename('WC2_sazo_temp');
var WC2_temp_ed_trimaisseco = ee.Image("users/nepzapufvjm/bandas/WC2_temp_ed_trimaisseco").clip(aoi).rename('WC2_temp_ed_trimaisseco');
var WC2_temp_max_mesmaisquent = ee.Image("users/nepzapufvjm/bandas/WC2_temp_max_mesmaisquent").clip(aoi).rename('WC2_temp_max_mesmaisquent');
var WC2_temp_med_anual = ee.Image("users/nepzapufvjm/bandas/WC2_temp_med_anual").clip(aoi).rename('WC2_temp_med_anual');
var WC2_temp_med_trimaisfrio = ee.Image("users/nepzapufvjm/bandas/WC2_temp_med_trimaisfrio").clip(aoi).rename('WC2_temp_med_trimaisfrio');
var WC2_temp_med_trimaisquente = ee.Image("users/nepzapufvjm/bandas/WC2_temp_med_trimaisquente").clip(aoi).rename('WC2_temp_med_trimaisquente');
var WC2_temp_med_trimaisumido = ee.Image("users/nepzapufvjm/bandas/WC2_temp_med_trimaisumido").clip(aoi).rename('WC2_temp_med_trimaisumido');
var WC2_temp_min_mesmaisfrio = ee.Image("users/nepzapufvjm/bandas/WC2_temp_min_mesmaisfrio").clip(aoi).rename('WC2_temp_min_mesmaisfrio');

// Koppen
var kop_am = ee.Image("users/nepzapufvjm/bandas/kop_am").clip(aoi).rename('kop_am');
var kop_as = ee.Image("users/nepzapufvjm/bandas/kop_as").clip(aoi).rename('kop_as');
var kop_aw = ee.Image("users/nepzapufvjm/bandas/kop_aw").clip(aoi).rename('kop_aw');
var kop_cfa = ee.Image("users/nepzapufvjm/bandas/kop_cfa").clip(aoi).rename('kop_cfa');
var kop_cfb = ee.Image("users/nepzapufvjm/bandas/kop_cfb").clip(aoi).rename('kop_cfb');
var kop_cwa = ee.Image("users/nepzapufvjm/bandas/kop_cwa").clip(aoi).rename('kop_cwa');
var kop_cwb = ee.Image("users/nepzapufvjm/bandas/kop_cwb").clip(aoi).rename('kop_cwb');


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
layersExplanatory = layersExplanatory.addBands(clima);
layersExplanatory = layersExplanatory.addBands(WC2_amplit_term_anual);
layersExplanatory = layersExplanatory.addBands(WC2_isotermalidade);
layersExplanatory = layersExplanatory.addBands(WC2_osc_term_dia);
layersExplanatory = layersExplanatory.addBands(WC2_prec_anual);
layersExplanatory = layersExplanatory.addBands(WC2_prec_mesmaisseco);
layersExplanatory = layersExplanatory.addBands(WC2_prec_mesmaisumido);
layersExplanatory = layersExplanatory.addBands(WC2_prec_trimaisfrio);
layersExplanatory = layersExplanatory.addBands(WC2_prec_trimaisquente);
layersExplanatory = layersExplanatory.addBands(WC2_prec_trimaisseco);
layersExplanatory = layersExplanatory.addBands(WC2_prec_trimaisumido);
layersExplanatory = layersExplanatory.addBands(WC2_sazo_pre);
layersExplanatory = layersExplanatory.addBands(WC2_sazo_temp);
layersExplanatory = layersExplanatory.addBands(WC2_temp_ed_trimaisseco);
layersExplanatory = layersExplanatory.addBands(WC2_temp_max_mesmaisquent);
layersExplanatory = layersExplanatory.addBands(WC2_temp_med_anual);
layersExplanatory = layersExplanatory.addBands(WC2_temp_med_trimaisfrio);
layersExplanatory = layersExplanatory.addBands(WC2_temp_med_trimaisquente);
layersExplanatory = layersExplanatory.addBands(WC2_temp_med_trimaisumido);
layersExplanatory = layersExplanatory.addBands(WC2_temp_min_mesmaisfrio);
layersExplanatory = layersExplanatory.addBands(kop_am);
layersExplanatory = layersExplanatory.addBands(kop_as);
layersExplanatory = layersExplanatory.addBands(kop_aw);
layersExplanatory = layersExplanatory.addBands(kop_cfa);
layersExplanatory = layersExplanatory.addBands(kop_cwa);
layersExplanatory = layersExplanatory.addBands(kop_cwb);
layersExplanatory = layersExplanatory.addBands(kop_cfb);

print(layersExplanatory.bandNames());

// Adiciona camada na visualização
//Map.addLayer(layersExplanatory.select('Slope'), {min: 0, max: 150}, 'Slope', true);


// Cria camada com as amostras de treinamento -------------------------------
var referencias = ee.FeatureCollection("users/nepzapufvjm/piloto/pontos_bacia_piloto_RPS");
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
              'geo_rochas_meta_carbonaticas', 'geo_formacao_ferrifera_bandada_bifs',
              'def','pdsi', 'vs', 'vpd','vap','aet','pet', 'srad', 'WC2_amplit_term_anual',
              'WC2_isotermalidade','WC2_osc_term_dia','WC2_prec_anual',
              'WC2_prec_mesmaisseco', 'WC2_prec_mesmaisumido','WC2_prec_trimaisfrio',
              'WC2_prec_trimaisquente','WC2_prec_trimaisseco','WC2_prec_trimaisumido',
              'WC2_sazo_pre','WC2_sazo_temp','WC2_temp_ed_trimaisseco',
              'WC2_temp_max_mesmaisquent', 'WC2_temp_med_anual','WC2_temp_med_trimaisfrio',
              'WC2_temp_med_trimaisquente', 'WC2_temp_med_trimaisumido',
              'WC2_temp_min_mesmaisfrio',  'kop_am', 'kop_as', 
              'kop_aw', 'kop_cfa', 'kop_cwa', 'kop_cwb', 'kop_cfb'
              ]

// une o cubo com os valores de referência para projetos agrícolas de grande porte
var treinamento = layersExplanatory.select(bandas).sampleRegions({
   collection:referencias,
   properties:['ag'], //seleciona coluna com valores 0 ou 1 para treinamento
   scale: 10
});

//print(treinamento);

// treinamento de uma randomForest baseado no potencial para projeto agrícolas grandes considerando camadas do cubo
var classificador = ee.Classifier.smileRandomForest(150).train({
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
var classificacaoComFiltro = classificacao.focalMin({kernel: kernel, iterations: 3}).focalMax({kernel: kernel, iterations: 2});
Map.addLayer(classificacaoComFiltro.clip(aoi),
 {min:0, max:1, palette:['red', 'green']},
 'ClassFinal');
 
 // Exportar
Export.image.toDrive({ image: classificacaoComFiltro.clip(aoi), description: 'n2_g_agr', 
scale: 30, maxPixels: 1338738636, region: aoi, folder: 'fapemig_mapeamento'});

// Variavel importância _ 
var dict_featImportance = classificador.explain();
print(dict_featImportance, 'dict_featImportance');
// Cast into a ee.Feature and a ee.FeatureCollection for exporting the importance as CSV
var variable_importance = ee.Feature(null, ee.Dictionary(dict_featImportance).get('importance'));
var variable_importance01 = ee.FeatureCollection(variable_importance);
// Export the FeatureCollection as CSV
Export.table.toDrive({collection: variable_importance01, description: 'n5_g_agr', fileFormat: 'CSV', folder: 'fapemig_mapeamento'})