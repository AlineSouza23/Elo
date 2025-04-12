import { useForm } from "react-hook-form";
import { z } from "zod";
import Cookies from "js-cookie";
import CryptoJS from "crypto-js";
import { useNavigate } from "react-router";
import { styles } from "./style"; // Certifique-se de que o caminho está correto


const signInForm = z.object({
    email: z.string().email(),
    password: z.string(),
});

type SignInForm = z.infer<typeof signInForm>;

export const SECRET_KEY = 'minha_chave_secreta';
export const TOKEN_EXPIRATION_TIME = 30 * 60 * 1000; // token expira em 30 minutos

const generateToken = () => {
    const timestamp = Date.now();
    const rawToken = `${Math.random().toString(36).substring(2)}.${timestamp}`;
    const hash = CryptoJS.HmacSHA256(rawToken, SECRET_KEY).toString();

    return { token: rawToken, hash };
};

export function SignIn() {
    const { register, handleSubmit } = useForm<SignInForm>();

    const navigate = useNavigate();

    async function handleSignIn(data: SignInForm) {
        try {
            if (data.email === 'coe.monitoria@elo.com.br' && data.password === 'COEMONITORIA') {
                const { token, hash } = generateToken();

                Cookies.set('authToken', token, { expires: 2, secure: true, sameSite: 'Strict' }); // Expira em 2 dias
                Cookies.set('authHash', hash, { expires: 2, secure: true, sameSite: 'Strict' }); // Expira em 2 dias

                navigate('/'); 

                return true;
            } else {
                alert('Realize o login com as credenciais corretas!');
                return false;
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <form onSubmit={handleSubmit(handleSignIn)} style={styles.container}> {/* Adicionando o estilo de container */}
            <input 
                id='email' 
                type="email" 
                placeholder="Seu usuario" 
                {...register('email')} 
                style={styles.input} 
            />
            <input 
                id='password' 
                type="password" 
                placeholder="Sua senha" 
                {...register('password')} 
                style={styles.input} 
            />
            <button 
                type="submit" 
                style={styles.button} 
            >
                Entrar
            </button>
        </form>
    );
}
