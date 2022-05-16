// Import plugins ----------------------------------------------------
var TAGEE = require('users/joselucassafanelli/TAGEE:TAGEE-functions');
var palettes = require('users/gena/packages:palettes'); // outras palhetas de cores https://github.com/gee-community/ee-palettes

// Shapefiles de interesse ----------------------------------------------------
// Estado de Minas Gerais
// var estados = ee.FeatureCollection("users/egorgens/zap/estados_br");
// var aoi = ee.FeatureCollection(estados).filterMetadata('ESTADO', 'equals', 'MG');

// Bacia do Rio Preto (área piloto)
var aoi = ee.FeatureCollection("users/ericgorgens/rioPretoMun");
var empty = ee.Image().byte();
var outline = empty.paint({
  featureCollection: aoi,
  color: 1,
  width: 3
});
Map.addLayer(outline, {palette: 'FF0000'}, 'AOI');

// Camadas explicativas ----------------------------------------------------
// Teor de argila do solo
var clay = ee.Image("OpenLandMap/SOL/SOL_CLAY-WFRACTION_USDA-3A1A1A_M/v02").select('b0', 'b10', 'b30').clip(aoi);
clay = clay.rename('clay0', 'clay10', 'clay30');
Map.addLayer(clay.select('clay0'), 
  {min: 30, max: 43}, 
  'Clay0', 
  false);

// Capacidade do solo
var bulk = ee.Image("OpenLandMap/SOL/SOL_BULKDENS-FINEEARTH_USDA-4A1H_M/v02").select('b0', 'b10', 'b30').clip(aoi);
bulk = bulk.rename('bulk0', 'bulk10', 'bulk30');
Map.addLayer(bulk.select('bulk0'), 
  {min: 100, max: 121}, 
  'Bulk0', 
  false);
  
// Materia orgânica solo
var organic = ee.Image("OpenLandMap/SOL/SOL_ORGANIC-CARBON_USDA-6A1C_M/v02").select('b0', 'b10', 'b30').clip(aoi);
organic = organic.rename('organic0', 'organic10', 'organic30');
Map.addLayer(organic.select('organic0'), 
  {min: 3, max: 5.8}, 
  'Organic0', 
  false);  

// Textura do solo  
var soilText = ee.Image("OpenLandMap/SOL/SOL_TEXTURE-CLASS_USDA-TT_M/v02").select('b0', 'b10', 'b30').clip(aoi);
soilText = soilText.rename('soilText0', 'soilText10', 'soilText30');
Map.addLayer(soilText.select('soilText0'), 
  {min: 1, max: 5.3}, 
  'SoilTexture0', 
  false);  
  
// Amplitude da temperatura da superfície
var tempSurface = ee.Image("OpenLandMap/CLM/CLM_LST_MOD11A2-DAYNIGHT_M/v01").select('jul').clip(aoi);
tempSurface = tempSurface.rename('tempSurfacejul');
Map.addLayer(tempSurface.select('tempSurfacejul'), 
  {min: 420, max: 515}, 
  'Tem Diff Jul', 
  false);  

// Distancia horizontal para curso de drenagem
var hand30 = ee.Image("users/gena/GlobalHAND/30m/hand-1000").clip(aoi).rename('hand');
Map.addLayer(hand30, 
  {min: 1, max: 150, palette: palettes.kovesi.diverging_bkr_55_10_c35[7]}, 
  'HAND 30 m', 
  false);

// Modelo digital de terreno
var srtm = ee.Image("USGS/SRTMGL1_003").clip(aoi);
var DEMAttributes = TAGEE.terrainAnalysis(TAGEE, srtm, aoi);
Map.addLayer(DEMAttributes.select('Slope'), 
  {min: 0, max: 30, palette:palettes.kovesi.diverging_bkr_55_10_c35[7]}, 
  'DeclividadeTagee', 
  false);
  
// Clima
var clima = ee.ImageCollection("IDAHO_EPSCOR/TERRACLIMATE")
  .filter(ee.Filter.date('2019-01-01', '2020-01-01'))
  .filter(ee.Filter.bounds(aoi))
  .median();
clima = clima.select('def', 'pdsi', 'vs').clip(aoi);
Map.addLayer(clima.select('pdsi'), 
  {min: -350, max: -250, palette:palettes.kovesi.diverging_bkr_55_10_c35[7]}, 
  'Climate', 
  true);
  
  
// Não descomentar. Calcula já incluido em TAGEE
// var slope = ee.Terrain.slope(srtm);
// Map.addLayer(slope, 
//   {min: 0, max: 30, palette:palettes.kovesi.diverging_bkr_55_10_c35[7]}, 
//   'DeclividadeGee', 
//   true);

// Criar stack das camadas -------------------------------------------------- 
var layersExplanatory = DEMAttributes;
layersExplanatory = layersExplanatory.addBands(hand30);
layersExplanatory = layersExplanatory.addBands(clay);
layersExplanatory = layersExplanatory.addBands(bulk);
layersExplanatory = layersExplanatory.addBands(organic);
layersExplanatory = layersExplanatory.addBands(soilText);
layersExplanatory = layersExplanatory.addBands(tempSurface);
layersExplanatory = layersExplanatory.addBands(clima);
print(layersExplanatory.bandNames());

// Cria camada com as amostras de treinamento -------------------------------
//var amostras = apto.merge(inapto);
//Map.addLayer(amostras,{},'Amostras', false);

// Treinamento e classificação
//var bandas = ['elevation', 'slope', 'hand', 'clay0', 'clay10',
//  'clay30', 'bulk0', 'bulk10', 'bulk30'];
              
// var treinamento = layersExplanatory.select(bandas).sampleRegions({
//   collection:amostras,
//   properties:['class'],
//   scale: 10
// });

// var classificador = ee.Classifier.smileRandomForest(10).train({
//   features: treinamento,
//   classProperty: 'class',
//   inputProperties: bandas
// });

// var classificacao = layersExplanatory.select(bandas).classify(classificador);
// Map.addLayer(classificacao.clip(aoi),
//   {min:0, max:1, palette:['red', 'green']},
//   'Classificação');

// var kernel = ee.Kernel.circle({radius: 1});

// Não descomentar
// var erodeClassificacao = classificacao.focal_min({kernel: kernel, iterations: 2});
// Map.addLayer(erodeClassificacao.clip(aoi),
//   {min:0, max:5, palette:['red', 'green']},
//   'Erode');
// var apertClassificacao = erodeClassificacao.focal_max({kernel: kernel, iteration: 2});


// var dilateClassificacao = classificacao.focal_max({kernel: kernel, iterations: 1});
// Map.addLayer(dilateClassificacao.clip(aoi),
//   {min:0, max:1, palette:['red', 'green']},
//   'ClassDilação');
