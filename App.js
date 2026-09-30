import React, { useState } from 'react';
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  SafeAreaView,
  StatusBar
} from 'react-native';

import MapView, { Marker } from 'react-native-maps';

export default function App() {
  // Estado para alternar o tipo de mapa ('standard' ou 'satellite')
  const [tipoMapa, setTipoMapa] = useState('standard');

  // Cadastro de 10 pontos turísticos reais em Santos - SP
  const locais = [
    {
      id: '1',
      nome: 'Museu do Café',
      descricao: 'Edifício histórico da antiga Bolsa Oficial do Café',
      latitude: -23.9333,
      longitude: -46.3283
    },
    {
      id: '2',
      nome: 'Aquário de Santos',
      descricao: 'Primeiro aquário público do Brasil',
      latitude: -23.9872,
      longitude: -46.3090
    },
    {
      id: '3',
      nome: 'Monte Serrat',
      descricao: 'Mirante com vista panorâmica da cidade e o Santuário de N. Sra. do Monte Serrat',
      latitude: -23.9442,
      longitude: -46.3312
    },
    {
      id: '4',
      nome: 'Jardim da Orla de Santos',
      descricao: 'Maior jardim praiano do mundo em extensão (Guinness Book)',
      latitude: -23.9698,
      longitude: -46.3325
    },
    {
      id: '5',
      nome: 'Estádio Vila Belmiro',
      descricao: 'Estádio Urbano Caldeira - Santos Futebol Clube',
      latitude: -23.9511,
      longitude: -46.3389
    },
    {
      id: '6',
      nome: 'Orquidário Municipal',
      descricao: 'Parque zoobotânico com espécies da Mata Atlântica',
      latitude: -23.9686,
      longitude: -46.3533
    },
    {
      id: '7',
      nome: 'Emissário Submerso (Parque Roberto Mário Santini)',
      descricao: 'Espaço de lazer na praia com pista de skate e ciclovia',
      latitude: -23.9739,
      longitude: -46.3508
    },
    {
      id: '8',
      nome: 'Pinacoteca Benedicto Calixto',
      descricao: 'Casarão histórico com acervo de artes visuais e eventos culturais',
      latitude: -23.9733,
      longitude: -46.3211
    },
    {
      id: '9',
      nome: 'Praça Mauá / Paço Municipal',
      descricao: 'Coração do Centro Histórico e sede do Governo Municipal',
      latitude: -23.9358,
      longitude: -46.3289
    },
    {
      id: '10',
      nome: 'Memorial das Conquistas',
      descricao: 'Museu de troféus, acervo histórico e conquistas do Santos FC',
      latitude: -23.9515,
      longitude: -46.3385
    }
  ];

  // Alterna o tipo de mapa entre Padrão e Satélite
  function mudarMapa() {
    setTipoMapa(prev => (prev === 'standard' ? 'satellite' : 'standard'));
  }

  return (
    <View style={styles.container}>
      {/* Barra de status transparente */}
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />

      {/* COMPONENTE DO MAPA */}
      <MapView
        style={styles.map}
        mapType={tipoMapa}
        zoomEnabled={true}
        scrollEnabled={true}
        pitchEnabled={true}
        rotateEnabled={true}
        zoomTapEnabled={true}
        initialRegion={{
          latitude: -23.9550,
          longitude: -46.3320,
          latitudeDelta: 0.08,
          longitudeDelta: 0.08
        }}
      >
        {locais.map((local) => (
          <Marker
            key={local.id}
            coordinate={{
              latitude: local.latitude,
              longitude: local.longitude
            }}
            title={local.nome}
            description={local.descricao}
            pinColor="#007AFF"
          />
        ))}
      </MapView>

      {/* PAINEL DE INFORMAÇÕES FLUTUANTE */}
      <SafeAreaView style={styles.painelContainer}>
        <View style={styles.painel}>
          <Text style={styles.titulo}>📍 Turismo na Minha Cidade</Text>
          <Text style={styles.subtitulo}>
            Toque em um marcador azul para ver detalhes do ponto turístico de Santos.
          </Text>

          <Pressable
            style={({ pressed }) => [
              styles.botao,
              pressed && styles.botaoPressionado
            ]}
            onPress={mudarMapa}
          >
            <Text style={styles.textoBotao}>
              {tipoMapa === 'standard' ? '🗺️ Ver Satélite' : '🏙️ Ver Mapa Padrão'}
            </Text>
          </Pressable>
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  map: {
    width: '100%',
    height: '100%',
  },
  painelContainer: {
    position: 'absolute',
    top: 40,
    left: 0,
    right: 0,
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  painel: {
    backgroundColor: '#ffffff',
    width: '100%',
    padding: 18,
    borderRadius: 16,
    elevation: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 5,
  },
  titulo: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#0f172a',
    marginBottom: 4,
  },
  subtitulo: {
    fontSize: 14,
    color: '#64748b',
    marginBottom: 16,
    lineHeight: 18,
  },
  botao: {
    backgroundColor: '#007AFF',
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  botaoPressionado: {
    opacity: 0.85,
    backgroundColor: '#0056b3',
  },
  textoBotao: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 15,
  },
});