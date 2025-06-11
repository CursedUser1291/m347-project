import { useColorScheme } from '@mui/joy/styles';
import IconButton from '@mui/joy/IconButton';
import { DarkMode, LightMode, Settings } from '@mui/icons-material';

function ModeToggle() {
    const { mode, setMode, systemMode } = useColorScheme();

    const getIcon = () => {
        if (mode === 'system') {
            return systemMode === 'dark' ? <DarkMode /> : <LightMode />;
        }
        return mode === 'dark' ? <DarkMode /> : <LightMode />;
    };

    return (
        <IconButton
            onClick={() => {
                if (mode === 'light') setMode('dark');
                else if (mode === 'dark') setMode('system');
                else setMode('light');
            }}
            variant="plain"
            color="neutral"
        >
            {mode === 'system' ? <Settings /> : getIcon()}
        </IconButton>
    );
}

export default ModeToggle;