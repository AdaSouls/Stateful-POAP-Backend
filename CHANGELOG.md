
# Version 0.10.5 - 27th Feb, 2024
* Add endpoints for fake web3 on/off on web2 asset instances

# Version 0.10.4 - 26th Feb, 2024
* Park the attempt at efficient name colleciton for now

# Version 0.10.3 - 26th Feb, 2024
* Code cleanup on Checkout Wallet Details

# Version 0.10.2 - 26th Feb, 2024
* Removed some unnecessary console logging

# Version 0.10.1 - 26th Feb, 2024
* Add "src" and "tag" to web2 token output in "Get Wallet Contents"

# Version 0.10.0 - 20th Feb, 2024
* Fake Web3 support
* TM Item ID upgrading
* Wallet sales

# Version 0.9.3 - 15th Feb, 2024
* Added a "Bulk Gift Web2 Asset to multiple users" endpoint
* Changed the way currencies are returned in wallet contents, and tightened up the code for more edge cases

# Version 0.9.2 - 15th Feb, 2024
* Make ERC20 contents conditionable

# Version 0.9.1 - 14th Feb, 2024
* Add wallet to content entries, as we support multiple wallets for a single user

# Version 0.9.0 - 14th Feb, 2024
Lots of stuff, including
* Price summaries
* ERC20 support as NFT assets
* ERC20 balances added to wallet contents
* Start of opensea webhook/monitoring support

# Version 0.8.0 - 6th Dec, 2023
* REVV price checking code
* promo web2 asset support

# Version 0.7.7 - 1st Dec, 2023
* Added REVV_DISCOUNT in .env

# Version 0.7.6 - 30th Nov, 2023
* Update REVV prices as cron job

# Version 0.7.5 - 28th Nov, 2023
* Console log cleanups

# Version 0.7.4 - 28th Nov, 2023
* Fixed up getWalletContents response
* fixed bug when have both address and smartAddress in getWalletContents

# Version 0.7.3 - 24th Nov, 2023
* Fixed async issue in get wallet contents

# Version 0.7.2 - 20th Nov, 2023
* Added smartWallet to getWalletContents code
* Added accessToken to nft_assets

# Version 0.7.1 - 20th Nov, 2023
* Fixed up Motorverse metadata processing so no "null" values end up in arrays
* Now use internal bitfield helpers to process a custom token instead of using ethers/smart contract
* Increased transactionId column lengths
* Store the whole eventData data blob against a Wert order

# Version 0.7.0 - 18th Nov, 2023
* Tightened up code for stripe and wert webhooks and order monitoring
* Added giveaway dates to web2_assets model
* New contract artifacts
* Fixed up error in GMG Asset custom token bitfield usage

# Version 0.6.3 - 7th Nov, 2023
* Respect alchemy's limit on contract addresses per call

# Version 0.6.2 - 7th Nov, 2023
* Restrict NFT addresses for games to same chain

# Version 0.6.1 - 7th Nov, 2023
* Bugfix in Get Wallet Content for no wallet address

# Version 0.6.0 - 7th Nov, 2023
* Lost of stuff around the way NFT and web2 assets are managed
* New web2 endpoints
* Ability to restart NFT/smart contract subscriptions

# Version 0.5.1 - 24th Oct, 2023
* Added "name" and "symbol" to metadata_templates table

# Version 0.5.0 - 21st Oct, 2023
This is the version released for Epic Store release 0.5.0.
* Update Joi validations to allow unknown fields
* Wert support
* Web2 asset support (e.g. purchases via Stripe)
* Mutable metadata support

# Version 0.1.0
This is the version released for Garage Preview.

