// Aptidão para empreendimentos agrícolas de grande porte
// N4 

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
var Slope = TAGEE.terrainAnalysis(TAGEE, srtm, aoi);

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

// Agua Disponivel no solo
var agua_disponivel = ee.Image("users/nepzapufvjm/bandas/agua_disponivel").clip(aoi).rename('agua_disponivel');
var aguadisponivel_0_5cm = ee.Image("users/nepzapufvjm/bandas/agua_disponivel0_5").clip(aoi).rename('aguadisponivel_0_5cm');
var aguadisponivel_100_200cm = ee.Image("users/nepzapufvjm/bandas/aguadisponivel100_200").clip(aoi).rename('aguadisponivel_100_200cm');
var aguadisponivel_30_60cm = ee.Image("users/nepzapufvjm/bandas/aguadisponivel30_60").clip(aoi).rename('aguadisponivel_30_60cm');
var aguadisponivel_5_15cm = ee.Image("users/nepzapufvjm/bandas/aguadisponivel5_15").clip(aoi).rename('aguadisponivel_5_15cm');
var aguadisponivel_60_100cm = ee.Image("users/nepzapufvjm/bandas/aguadisponivel60_100").clip(aoi).rename('aguadisponivel_60_100cm');

// Distancia horizontal para curso de drenagem
var hand = ee.Image("users/gena/GlobalHAND/30m/hand-1000").clip(aoi).rename('hand');

// Concentração de nascentes
var concent_nascentes = ee.Image("users/nepzapufvjm/bandas/concentracao_nascentes").clip(aoi).rename('concent_nascentes');

//areia
var areia_0_5cm = ee.Image("users/nepzapufvjm/bandas/areia_0_5").clip(aoi).rename('areia_0_5cm');
var areia_100_200cm = ee.Image("users/nepzapufvjm/bandas/areia_100_200").clip(aoi).rename('areia_100_200cm');
var areia_30_60cm = ee.Image("users/nepzapufvjm/bandas/areia_30_60").clip(aoi).rename('areia_30_60cm');
var areia_5_15cm = ee.Image("users/nepzapufvjm/bandas/areia_5_15").clip(aoi).rename('areia_5_15cm');
var areia_60_100cm = ee.Image("users/nepzapufvjm/bandas/areia_60_100").clip(aoi).rename('areia_60_100cm');
var areia_15_30cm = ee.Image("users/nepzapufvjm/bandas/areia_15_30").clip(aoi).rename('areia_15_30cm');

//argila
var argila_0_5cm = ee.Image("users/nepzapufvjm/bandas/argila_0_5").clip(aoi).rename('argila_0_5cm');
var argila_100_200cm = ee.Image("users/nepzapufvjm/bandas/argila_100_200").clip(aoi).rename('argila_100_200cm');
var argila_30_60cm = ee.Image("users/nepzapufvjm/bandas/argila_30_60").clip(aoi).rename('argila_30_60cm');
var argila_5_15cm = ee.Image("users/nepzapufvjm/bandas/argila_5_15").clip(aoi).rename('argila_5_15cm');
var argila_60_100cm = ee.Image("users/nepzapufvjm/bandas/argila_60_100").clip(aoi).rename('argila_60_100cm');
var argila_15_30cm = ee.Image("users/nepzapufvjm/bandas/argila_15_30").clip(aoi).rename('argila_15_30cm');

//co
var co_0_5cm = ee.Image("users/nepzapufvjm/bandas/co_0_5").clip(aoi).rename('co_0_5cm');
var co_100_200cm = ee.Image("users/nepzapufvjm/bandas/co_100_200").clip(aoi).rename('co_100_200cm');
var co_30_60cm = ee.Image("users/nepzapufvjm/bandas/co_30_60").clip(aoi).rename('co_30_60cm');
var co_5_15cm = ee.Image("users/nepzapufvjm/bandas/co_5_15").clip(aoi).rename('co_5_15cm');
var co_60_100cm = ee.Image("users/nepzapufvjm/bandas/co_60_100").clip(aoi).rename('co_60_100cm');
var co_15_30cm = ee.Image("users/nepzapufvjm/bandas/co_15_30").clip(aoi).rename('co_15_30cm');

//ctc
var ctc_0_5cm = ee.Image("users/nepzapufvjm/bandas/ctc_0_5").clip(aoi).rename('ctc_0_5cm');
var ctc_100_200cm = ee.Image("users/nepzapufvjm/bandas/ctc_100_200").clip(aoi).rename('ctc_100_200cm');
var ctc_30_60cm = ee.Image("users/nepzapufvjm/bandas/ctc_30_60").clip(aoi).rename('ctc_30_60cm');
var ctc_5_15cm = ee.Image("users/nepzapufvjm/bandas/ctc_5_15").clip(aoi).rename('ctc_5_15cm');
var ctc_60_100cm = ee.Image("users/nepzapufvjm/bandas/ctc_60_100").clip(aoi).rename('ctc_60_100cm');
var ctc_15_30cm = ee.Image("users/nepzapufvjm/bandas/ctc_15_30").clip(aoi).rename('ctc_15_30cm');

//ds
var ds_0_5cm = ee.Image("users/nepzapufvjm/bandas/ds_0_5").clip(aoi).rename('ds_0_5cm');
var ds_100_200cm = ee.Image("users/nepzapufvjm/bandas/ds_100_200").clip(aoi).rename('ds_100_200cm');
var ds_30_60cm = ee.Image("users/nepzapufvjm/bandas/ds_30_60").clip(aoi).rename('ds_30_60cm');
var ds_5_15cm = ee.Image("users/nepzapufvjm/bandas/ds_5_15").clip(aoi).rename('ds_5_15cm');
var ds_60_100cm = ee.Image("users/nepzapufvjm/bandas/ds_60_100").clip(aoi).rename('ds_60_100cm');
var ds_15_30cm = ee.Image("users/nepzapufvjm/bandas/ds_15_30").clip(aoi).rename('ds_15_30cm');

//pH
var ph_0_5cm = ee.Image("users/nepzapufvjm/bandas/ph_0_5").clip(aoi).rename('ph_0_5cm');
var ph_100_200cm = ee.Image("users/nepzapufvjm/bandas/ph_100_200").clip(aoi).rename('ph_100_200cm');
var ph_30_60cm = ee.Image("users/nepzapufvjm/bandas/ph_30_60").clip(aoi).rename('ph_30_60cm');
var ph_5_15cm = ee.Image("users/nepzapufvjm/bandas/ph_5_15").clip(aoi).rename('ph_5_15cm');
var ph_60_100cm = ee.Image("users/nepzapufvjm/bandas/ph_60_100").clip(aoi).rename('ph_60_100cm');
var ph_15_30cm = ee.Image("users/nepzapufvjm/bandas/ph_15_30").clip(aoi).rename('ph_15_30cm');

//silte
var silte_0_5cm = ee.Image("users/nepzapufvjm/bandas/silte_0_5").clip(aoi).rename('silte_0_5cm');
var silte_100_200cm = ee.Image("users/nepzapufvjm/bandas/silte_100_200").clip(aoi).rename('silte_100_200cm');
var silte_30_60cm = ee.Image("users/nepzapufvjm/bandas/silte_30_60").clip(aoi).rename('silte_30_60cm');
var silte_5_15cm = ee.Image("users/nepzapufvjm/bandas/silte_5_15").clip(aoi).rename('silte_5_15cm');
var silte_60_100cm = ee.Image("users/nepzapufvjm/bandas/silte_60_100").clip(aoi).rename('silte_60_100cm');
var silte_15_30cm = ee.Image("users/nepzapufvjm/bandas/silte_15_30").clip(aoi).rename('silte_15_30cm');

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
layersExplanatory = layersExplanatory.addBands(agua_disponivel);
layersExplanatory = layersExplanatory.addBands(aguadisponivel_0_5cm);
layersExplanatory = layersExplanatory.addBands(aguadisponivel_100_200cm);
layersExplanatory = layersExplanatory.addBands(aguadisponivel_30_60cm);
layersExplanatory = layersExplanatory.addBands(aguadisponivel_5_15cm);
layersExplanatory = layersExplanatory.addBands(aguadisponivel_60_100cm);
layersExplanatory = layersExplanatory.addBands(hand);
layersExplanatory = layersExplanatory.addBands(concent_nascentes);
layersExplanatory = layersExplanatory.addBands(areia_0_5cm);
layersExplanatory = layersExplanatory.addBands(areia_100_200cm);
layersExplanatory = layersExplanatory.addBands(areia_30_60cm);
layersExplanatory = layersExplanatory.addBands(areia_5_15cm);
layersExplanatory = layersExplanatory.addBands(areia_60_100cm);
layersExplanatory = layersExplanatory.addBands(areia_15_30cm);
layersExplanatory = layersExplanatory.addBands(argila_0_5cm);
layersExplanatory = layersExplanatory.addBands(argila_100_200cm);
layersExplanatory = layersExplanatory.addBands(argila_30_60cm);
layersExplanatory = layersExplanatory.addBands(argila_5_15cm);
layersExplanatory = layersExplanatory.addBands(argila_60_100cm);
layersExplanatory = layersExplanatory.addBands(argila_15_30cm);
layersExplanatory = layersExplanatory.addBands(co_0_5cm);
layersExplanatory = layersExplanatory.addBands(co_100_200cm);
layersExplanatory = layersExplanatory.addBands(co_30_60cm);
layersExplanatory = layersExplanatory.addBands(co_5_15cm);
layersExplanatory = layersExplanatory.addBands(co_60_100cm);
layersExplanatory = layersExplanatory.addBands(co_15_30cm);
layersExplanatory = layersExplanatory.addBands(ctc_0_5cm);
layersExplanatory = layersExplanatory.addBands(ctc_100_200cm);
layersExplanatory = layersExplanatory.addBands(ctc_30_60cm);
layersExplanatory = layersExplanatory.addBands(ctc_5_15cm);
layersExplanatory = layersExplanatory.addBands(ctc_60_100cm);
layersExplanatory = layersExplanatory.addBands(ctc_15_30cm);
layersExplanatory = layersExplanatory.addBands(ds_0_5cm);
layersExplanatory = layersExplanatory.addBands(ds_100_200cm);
layersExplanatory = layersExplanatory.addBands(ds_30_60cm);
layersExplanatory = layersExplanatory.addBands(ds_5_15cm);
layersExplanatory = layersExplanatory.addBands(ds_60_100cm);
layersExplanatory = layersExplanatory.addBands(ds_15_30cm);
layersExplanatory = layersExplanatory.addBands(ph_0_5cm);
layersExplanatory = layersExplanatory.addBands(ph_100_200cm);
layersExplanatory = layersExplanatory.addBands(ph_30_60cm);
layersExplanatory = layersExplanatory.addBands(ph_5_15cm);
layersExplanatory = layersExplanatory.addBands(ph_15_30cm);
layersExplanatory = layersExplanatory.addBands(ph_60_100cm);
layersExplanatory = layersExplanatory.addBands(silte_0_5cm);
layersExplanatory = layersExplanatory.addBands(silte_100_200cm);
layersExplanatory = layersExplanatory.addBands(silte_30_60cm);
layersExplanatory = layersExplanatory.addBands(silte_5_15cm);
layersExplanatory = layersExplanatory.addBands(silte_60_100cm);
layersExplanatory = layersExplanatory.addBands(silte_15_30cm);

print(layersExplanatory.bandNames());

// Cria camada com as amostras de treinamento -------------------------------
var referencias = ee.FeatureCollection("users/nepzapufvjm/campodm");
print(referencias);
Map.addLayer(referencias,{},'Amostras', true);

var bandas = ['solos_argissoloamarelo', 
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
              'kop_aw', 'kop_cfa', 'kop_cwa', 'kop_cwb', 'kop_cfb',
              'agua_disponivel', 'aguadisponivel_0_5cm', 
              'aguadisponivel_100_200cm', 'aguadisponivel_30_60cm', 'aguadisponivel_5_15cm', 
              'aguadisponivel_60_100cm', 'hand','concent_nascentes',
              'Elevation', 'Aspect', 'Hillshade', 'Northness',
              'Eastness','HorizontalCurvature', 'VerticalCurvature','MeanCurvature',
              'GaussianCurvature', 'MinimalCurvature','MaximalCurvature',
              'ph_0_5cm', 'ph_100_200cm', 'ph_30_60cm', 
              'ph_5_15cm', 'ph_60_100cm', 'ph_15_30cm', 'ctc_0_5cm', 'ctc_100_200cm', 
              'ctc_30_60cm', 'ctc_5_15cm', 'ctc_60_100cm', 'ctc_15_30cm',  'areia_0_5cm', 
              'areia_100_200cm', 'areia_30_60cm', 'areia_5_15cm', 'areia_60_100cm', 'areia_15_30cm',
              'silte_0_5cm', 'silte_100_200cm', 'silte_30_60cm', 'silte_5_15cm', 
              'silte_60_100cm', 'silte_15_30cm','argila_0_5cm', 'argila_100_200cm', 
              'argila_30_60cm', 'argila_5_15cm', 'argila_60_100cm', 'argila_15_30cm',
              'co_0_5cm', 'co_100_200cm', 'co_30_60cm', 'co_5_15cm', 
              'co_60_100cm', 'co_15_30cm','ds_0_5cm', 'ds_100_200cm', 
              'ds_30_60cm', 'ds_5_15cm', 'ds_60_100cm', 'ds_15_30cm'
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
Export.image.toDrive({ image: classificacaoComFiltro.clip(aoi), description: 'n4_g_agr', 
scale: 30, maxPixels: 1338738636, region: aoi, folder: 'fapemig_mapeamento'});

// Variavel importância _ 
var dict_featImportance = classificador.explain();
print(dict_featImportance, 'dict_featImportance');
// Cast into a ee.Feature and a ee.FeatureCollection for exporting the importance as CSV
var variable_importance = ee.Feature(null, ee.Dictionary(dict_featImportance).get('importance'));
var variable_importance01 = ee.FeatureCollection(variable_importance);
// Export the FeatureCollection as CSV
Export.table.toDrive({collection: variable_importance01, description: 'n5_g_agr', fileFormat: 'CSV', folder: 'fapemig_mapeamento'})