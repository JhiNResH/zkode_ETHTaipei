// Proving page

import { Button, Text, Flex, Box } from '@chakra-ui/react';
import { NextPage } from 'next';
import { signIn, useSession } from 'next-auth/react';
import { Center, Heading, VStack, HStack, Icon } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { MdRadioButtonChecked, MdRadioButtonUnchecked } from 'react-icons/md';
import { useState } from 'react';
import TopNavBar from 'components/NavBar';

const Proving: NextPage = () => {
    const router = useRouter();
    const { data: session } = useSession();
    const [currentStep, setCurrentStep] = useState(1);

    return (
        <>
            <Box position="fixed" w="100%" zIndex="999">
                <TopNavBar></TopNavBar>
            </Box>
        </>
    );
};

export default Proving;
