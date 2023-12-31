import { ScrollView, Image, Text, Box, Checkbox } from 'native-base';
import { Titulo } from './components/Titulo';
import Logo from './assets/Logo.png';
import { Botao } from './components/Botao';
import { EntradaTexto } from './components/EntradaTexto';
import { useState } from 'react';
import { secoes } from './utils/CadastroEntradaTexto';

export default function Cadastro() {

    const [numSecao, setNumSecao] = useState(0);
    const [dados, setDados] = useState({} as any);



    function avancarSecao() {
        if (numSecao < secoes.length - 1) {
            setNumSecao(numSecao + 1)
        }
        else {
            console.log(dados);
        }
    }

    function voltarSecao() {
        if (numSecao > 0) {
            setNumSecao(numSecao - 1)
        }
    }

    function atualizarDados(id: string, valor: string) {
        setDados({ ...dados, [id]: valor })
    }


    return (
        <ScrollView flex={1} padding={5}>
            <Image source={Logo} alt='Logo Voll' alignSelf="center" />
            <Titulo>
                {secoes[numSecao].titulo}
            </Titulo>
            <Box>
                {
                    secoes[numSecao]?.entradaTexto?.map(entrada => {
                        return (
                            <EntradaTexto
                                label={entrada.label}
                                placeholder={entrada.placeholder}
                                key={entrada.id}
                                secureTextEntry={entrada.secureTextEntry}
                                value={dados[entrada.name]}
                                onChangeText={(text) => atualizarDados(entrada.name, text)}
                            />)
                    })
                }
            </Box>
            <Box>
                <Text color="blue.800" fontWeight="bold" fontSize="md" marginTop={2} marginBottom={2}>Selecione o plano</Text>
                {
                    secoes[numSecao].checkbox.map(checkbox => {
                        return <Checkbox key={checkbox.id} value={checkbox.value}>
                            {checkbox.value}
                        </Checkbox>
                    })
                }
            </Box>
            {numSecao > 0 && <Botao onPress={() => voltarSecao()} backgroundColor="gray.400"> Voltar </Botao>}
            <Botao onPress={() => avancarSecao()} marginTop={4}> Avançar </Botao>
        </ScrollView>
    );
}





