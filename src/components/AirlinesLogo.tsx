interface Props {
  IATA: string;
}

export default function AirlinesLogo({ IATA }: Props) {
  return (
    <img src={`http://pics.avs.io/99/36/${IATA}.png`} alt='airlines-logo' />
  );
}
