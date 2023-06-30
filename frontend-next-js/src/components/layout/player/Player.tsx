import playerStyles from '@/styles/layout/player.module.scss'
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import PauseCircleIcon from '@mui/icons-material/PauseCircle';
import VolumeMuteIcon from '@mui/icons-material/VolumeMute';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import TrackProgress from './TrackProgress';
import { useGetState } from '@/hooks/useGetState';
import useGetAction from '@/hooks/useGetAction';
import { useEffect } from 'react';

let audio;

const Player = () => {
    const track = { _id: '1', name: 'Name', artist: 'Artist', text: 'Text', listened: 1, picture: 'https://img.freepik.com/free-vector/musical-pentagram-sound-waves-notes-background_1017-33911.jpg?w=2000&t=st=1687600589~exp=1687601189~hmac=fde81f2d1af731b995ceafe98e1298175b1a37233df0037bf403e7041a405585', audio: 'http://localhost:3000/audio/77473628-55b8-43b2-a68b-46ed7eadc973.mp3', comments: []}
    
    const { player } = useGetState();
    const { setActiveTrack, setVolume, setDuration, setCurrentTime, setPause, setPlay } = useGetAction();
    useEffect(() => {
        if(!audio) {
            audio = new Audio()
        } else {
            setAudio(); 
            play();
        }
    }, [player.activeTrack])

    const setAudio = () => {
        if (player.activeTrack) {
            audio.src = 'http://localhost:3000/' + player.activeTrack?.audio;
            audio.volume = player.volume / 100; //Чтобы при первом забуске приложения звук автоматически был на 30% громкости
            audio.onloadedmetadata = () => {
                setDuration(Math.ceil(audio.duration))
            }
            audio.ontimeupdate = () => { //Вешаем ивент который срабатывает при проигрывании трека и обновляет setCurrentTime()
                setCurrentTime(Math.ceil(audio.currentTime)) //Таким образом, пока трек играет - мы двигаем ползунок
            }
        }
    }

    const play = () => {
        if (player.isPaused) {
            setPlay()
            audio.play()
        } else {
            setPause()
            audio.pause()
        }
    }

    const changeVolume = (e: React.ChangeEvent<HTMLInputElement>) => {
        setVolume(Number(e.target.value)) //Преобразуем в числовое значение и сохраняем
        audio.volume = Number(e.target.value) / 100; //Громкость варируется от 0 до 1
    }

    const trackScroll = (e: React.ChangeEvent<HTMLInputElement>) => {
        //Когда двигаем ползунок - меняем audio.currentTime
        audio.currentTime = Math.ceil(Number(e.target.value));
        //На изменение audio.currentTime срабатывает - audio.ontimeupdate и начинает играть с текущего заданого времени
    }
    
    if (!player.activeTrack) {
        return null
    }

    return (
        <div>
            <div className={`${playerStyles.playerContainer}`}>
                <div onClick={play}>
                    {player.isPaused
                        ? <PlayCircleIcon fontSize="large"/>
                        : <PauseCircleIcon fontSize="large"/>
                    }
                </div>
                <div className={`${playerStyles.track}`}>
                    <h3>{player.activeTrack.name}</h3>
                    <h4>{player.activeTrack.artist}</h4>
                </div>

                <TrackProgress currPosition={player.currentTime} fullLenght={player.duration} onChange={trackScroll}/>

                <div className={`${playerStyles.volume}`}>
                    <VolumeMuteIcon />
                    <TrackProgress currPosition={player.volume} fullLenght={100} onChange={changeVolume}/>
                    <VolumeUpIcon />
                </div>
            </div>
        </div>
    );
}
 
export default Player;