module 0x0::token {
    use sui::object::{Self, UID};
    use sui::transfer;
    use sui::tx_context::{Self, TxContext};
    use sui::balance::{Self, Balance};
    use sui::coin::{Self, Coin, CoinMetadata, TreasuryCap};
    use std::option;
    use sui::url;
    use sui::event;

    /// The type identifier of TOKEN coin
    public struct TOKEN has drop {}

    /// Capability that grants permission to mint and burn TOKEN coins
    public struct MinterCap has key, store {
        id: UID
    }

    /// Event emitted when tokens are minted
    public struct MintEvent has copy, drop {
        amount: u64,
        recipient: address
    }

    /// Event emitted when tokens are burned
    public struct BurnEvent has copy, drop {
        amount: u64,
        sender: address
    }

    fun init(witness: TOKEN, ctx: &mut TxContext) {
        let (treasury_cap, metadata) = coin::create_currency(
            witness,
            9,
            b"IBT",
            b"Inter-Blockchain Token",
            b"A bridgeable token between Ethereum and Sui",
            option::some(url::new_unsafe_from_bytes(b"https://example.com/ibt.png")),
            ctx
        );

        let minter_cap = MinterCap {
            id: object::new(ctx)
        };

        transfer::public_transfer(treasury_cap, tx_context::sender(ctx));
        transfer::public_transfer(metadata, tx_context::sender(ctx));
        transfer::public_transfer(minter_cap, tx_context::sender(ctx));
    }

    public entry fun mint(
        treasury_cap: &mut TreasuryCap<TOKEN>,
        _minter_cap: &MinterCap,
        amount: u64,
        recipient: address,
        ctx: &mut TxContext
    ) {
        let coin = coin::mint(treasury_cap, amount, ctx);
        transfer::public_transfer(coin, recipient);

        event::emit(MintEvent {
            amount,
            recipient
        });
    }

    public entry fun burn(
        treasury_cap: &mut TreasuryCap<TOKEN>,
        _minter_cap: &MinterCap,
        coin: &mut Coin<TOKEN>,
        burn_amount: u64,
        ctx: &mut TxContext
    ) {
        assert!(coin::value(coin) >= burn_amount, 0);
        let coin_to_burn = coin::split(coin, burn_amount, ctx);
        coin::burn(treasury_cap, coin_to_burn);

        event::emit(BurnEvent {
            amount: burn_amount,
            sender: tx_context::sender(ctx)
        });
    }

    #[test_only]
    public fun init_for_testing(ctx: &mut TxContext) {
        init(TOKEN {}, ctx)
    }
}