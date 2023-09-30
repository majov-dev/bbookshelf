import React, { ReactElement, useEffect, useState } from "react";
import Access from "../Access/Access";

interface PrivateProps {
  Page: React.ComponentType;
}

const Private: React.FC<PrivateProps> = ({
  Page,
}: PrivateProps): ReactElement => {
  const [randomBoolean, setRandomBoolean] = useState<Boolean>(true);

  useEffect(() => {
    const generateRandomBoolean = () => {
      return Math.random() < 0.5;
    };

    setRandomBoolean(generateRandomBoolean());
  }, []);

  return randomBoolean ? <Page /> : <Access />;
};

export default Private;
