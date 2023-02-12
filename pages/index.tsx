import Head from "next/head";
import { Input, Button, Text, Spacer, Loading, Grid } from "@nextui-org/react";
import { useAccountInfo } from "@/hooks/useAccountInfo";

export default function Home() {
  const {
    address,
    balance,
    error,
    handleChange,
    handleClick,
    isLoading,
    isExecutable,
  } = useAccountInfo();

  return (
    <>
      <Head>
        <title>Solana get balance</title>
        <meta name="description" content="Get balance of solana account" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Grid.Container
        justify="center"
        alignContent="center"
        css={{ height: "100vh" }}
      >
        <Grid xs={10} md={6} css={{ display: "flex", flexDirection: "column" }}>
          <Text h2 css={{ textAlign: "center" }}>
            Start your Solana journey
          </Text>
          <Spacer />
          <Input
            size="lg"
            bordered
            label="Solana Wallet Address"
            onChange={handleChange}
          />
          <Spacer />
          <Button shadow color="gradient" onPress={handleClick}>
            Check SOL Balance
          </Button>
          <Spacer />
          {isLoading && <Loading type="points" color="white" />}
          {error && (
            <Text h4 color="error" css={{ textAlign: "center" }}>
              Error: {error}
            </Text>
          )}
          {balance && (
            <>
              <Text
                h4
                css={{
                  textAlign: "center",
                }}
              >
                Solana Address:
              </Text>
              <Text
                h4
                css={{
                  textAlign: "center",
                  "@smMax": { overflowY: "scroll" },
                }}
              >
                {address}
              </Text>
              <Text h4 css={{ textAlign: "center" }}>
                Balance: {balance} SOL
              </Text>
              <Text h4 css={{ textAlign: "center" }}>
                It is Executable? {isExecutable ? "Yes 😀" : "Noup 🙅‍♂️"}
              </Text>
            </>
          )}
        </Grid>
      </Grid.Container>
    </>
  );
}
