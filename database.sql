PGDMP  %    !    	        	    |            inventory_db    16.3    16.3 9    +           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            ,           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            -           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            .           1262    24683    inventory_db    DATABASE     �   CREATE DATABASE inventory_db WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'Indonesian_Indonesia.1252';
    DROP DATABASE inventory_db;
                postgres    false            �            1259    24859    folder_paths    TABLE     �   CREATE TABLE public.folder_paths (
    id integer NOT NULL,
    folder_path text NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    title character varying(255)
);
     DROP TABLE public.folder_paths;
       public         heap    postgres    false            �            1259    24858    folder_paths_id_seq    SEQUENCE     �   CREATE SEQUENCE public.folder_paths_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 *   DROP SEQUENCE public.folder_paths_id_seq;
       public          postgres    false    224            /           0    0    folder_paths_id_seq    SEQUENCE OWNED BY     K   ALTER SEQUENCE public.folder_paths_id_seq OWNED BY public.folder_paths.id;
          public          postgres    false    223            �            1259    24703 	   microsoft    TABLE     p  CREATE TABLE public.microsoft (
    id integer NOT NULL,
    company_name character varying(255) NOT NULL,
    department character varying(255),
    user_name character varying(255) NOT NULL,
    account character varying(255),
    products_name character varying(255) NOT NULL,
    sku_number character varying(100),
    version character varying(50),
    type_license character varying(50),
    contact_number character varying(20),
    qty integer NOT NULL,
    effective_date date,
    expired_date date,
    po character varying(100),
    vendor_name character varying(255),
    email_vendor character varying(255)
);
    DROP TABLE public.microsoft;
       public         heap    postgres    false            �            1259    24702    microsoft_id_seq    SEQUENCE     �   CREATE SEQUENCE public.microsoft_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 '   DROP SEQUENCE public.microsoft_id_seq;
       public          postgres    false    220            0           0    0    microsoft_id_seq    SEQUENCE OWNED BY     E   ALTER SEQUENCE public.microsoft_id_seq OWNED BY public.microsoft.id;
          public          postgres    false    219            �            1259    24694    pc    TABLE     �  CREATE TABLE public.pc (
    id integer NOT NULL,
    it_code character varying(50) NOT NULL,
    brand character varying(100),
    serial_number character varying(100),
    ip_address character varying(50),
    mac_address character varying(50),
    host_name character varying(100),
    location character varying(100),
    business_unit character varying(100),
    department character varying(100),
    username character varying(100),
    status character varying(255)
);
    DROP TABLE public.pc;
       public         heap    postgres    false            �            1259    24693 	   pc_id_seq    SEQUENCE     �   CREATE SEQUENCE public.pc_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
     DROP SEQUENCE public.pc_id_seq;
       public          postgres    false    218            1           0    0 	   pc_id_seq    SEQUENCE OWNED BY     7   ALTER SEQUENCE public.pc_id_seq OWNED BY public.pc.id;
          public          postgres    false    217            �            1259    25029    server    TABLE     �  CREATE TABLE public.server (
    id integer NOT NULL,
    rack character varying(50) NOT NULL,
    seq character varying(50) NOT NULL,
    type character varying(100) NOT NULL,
    active character varying(50) NOT NULL,
    asset_category character varying(100) NOT NULL,
    asset_number character varying(100) NOT NULL,
    asset_tag_number character varying(100) NOT NULL,
    site character varying(100) NOT NULL,
    location character varying(100) NOT NULL,
    "user" character varying(100) NOT NULL,
    job_title character varying(100) NOT NULL,
    bu character varying(100) NOT NULL,
    domain character varying(100) NOT NULL,
    deposit_cyberark character varying(255) NOT NULL,
    server_ownership character varying(100) NOT NULL,
    application_owner character varying(100) NOT NULL,
    system_owner character varying(100) NOT NULL,
    business_unit character varying(100) NOT NULL,
    add_in_solarwinds character varying(255) NOT NULL,
    server_role character varying(100) NOT NULL,
    brand character varying(100) NOT NULL,
    mac_address character varying(50) NOT NULL,
    host_name character varying(100) NOT NULL,
    ip_address character varying(50) NOT NULL,
    ilo character varying(50) NOT NULL,
    model character varying(100) NOT NULL,
    serial_no character varying(100) NOT NULL,
    physical_virtual character varying(50) NOT NULL,
    power_supply_model character varying(100) NOT NULL,
    eosl_date date NOT NULL,
    planned_refresh_date date NOT NULL,
    eosl_status character varying(50) NOT NULL,
    cip character varying(255) NOT NULL,
    date_purchased date NOT NULL,
    power_supply_model_description character varying(255) NOT NULL,
    power_consumption numeric(10,2) NOT NULL,
    btu_hour numeric(10,2) NOT NULL,
    po_renewal_maintenance_contract character varying(100) NOT NULL,
    po_purchase_material character varying(100) NOT NULL,
    cost_local_currency numeric(12,2) NOT NULL,
    indicate_which_currency character varying(10) NOT NULL,
    cost_usd numeric(12,2) NOT NULL,
    utilization_storage numeric(10,2) NOT NULL,
    criticality_rating character varying(50) NOT NULL,
    dr_enable character varying(255) NOT NULL,
    warranty_start_date date NOT NULL,
    end_date date NOT NULL,
    date_disposed date NOT NULL,
    core_each_processor integer NOT NULL,
    number_of_physical_processor integer NOT NULL,
    total_core integer NOT NULL,
    cpu character varying(100) NOT NULL,
    ram character varying(100) NOT NULL,
    hard_disk character varying(100) NOT NULL,
    part_number_harddisk character varying(100) NOT NULL,
    usb_disabled character varying(255) NOT NULL,
    cd_dvd character varying(255) NOT NULL,
    os_version character varying(100) NOT NULL,
    remarks text NOT NULL,
    ms_office_version character varying(100) NOT NULL,
    druva character varying(255) NOT NULL,
    ip_guard character varying(255) NOT NULL,
    fde character varying(255) NOT NULL
);
    DROP TABLE public.server;
       public         heap    postgres    false            �            1259    25028    server_id_seq    SEQUENCE     �   CREATE SEQUENCE public.server_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 $   DROP SEQUENCE public.server_id_seq;
       public          postgres    false    228            2           0    0    server_id_seq    SEQUENCE OWNED BY     ?   ALTER SEQUENCE public.server_id_seq OWNED BY public.server.id;
          public          postgres    false    227            �            1259    24895    telnet    TABLE     P  CREATE TABLE public.telnet (
    id integer NOT NULL,
    area character varying(255),
    role character varying(255),
    ip_address character varying(255),
    hostname character varying(255),
    brand character varying(255),
    device_type character varying(255),
    serial_number character varying(255),
    source_date date
);
    DROP TABLE public.telnet;
       public         heap    postgres    false            �            1259    24894    telnet_id_seq    SEQUENCE     �   CREATE SEQUENCE public.telnet_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 $   DROP SEQUENCE public.telnet_id_seq;
       public          postgres    false    226            3           0    0    telnet_id_seq    SEQUENCE OWNED BY     ?   ALTER SEQUENCE public.telnet_id_seq OWNED BY public.telnet.id;
          public          postgres    false    225            �            1259    24685    users    TABLE     �   CREATE TABLE public.users (
    id integer NOT NULL,
    username character varying(100) NOT NULL,
    password character varying(100) NOT NULL,
    name character varying(100) NOT NULL
);
    DROP TABLE public.users;
       public         heap    postgres    false            �            1259    24684    users_id_seq    SEQUENCE     �   CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 #   DROP SEQUENCE public.users_id_seq;
       public          postgres    false    216            4           0    0    users_id_seq    SEQUENCE OWNED BY     =   ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;
          public          postgres    false    215            �            1259    24850    vendor_repair    TABLE     �  CREATE TABLE public.vendor_repair (
    id integer NOT NULL,
    repair_date date,
    ticket_number character varying(255),
    engineer_name character varying(255),
    username character varying(255),
    bu_name character varying(255),
    material_name character varying(255),
    brand character varying(255),
    type character varying(255),
    serial_number character varying(255),
    cost_center character varying(255),
    pr_number character varying(255),
    po_number character varying(255),
    quotation_date date,
    cost_without numeric,
    status character varying(255),
    vendor_delivery_date date,
    remarks text
);
 !   DROP TABLE public.vendor_repair;
       public         heap    postgres    false            �            1259    24849    vendor_repair_id_seq    SEQUENCE     �   CREATE SEQUENCE public.vendor_repair_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 +   DROP SEQUENCE public.vendor_repair_id_seq;
       public          postgres    false    222            5           0    0    vendor_repair_id_seq    SEQUENCE OWNED BY     M   ALTER SEQUENCE public.vendor_repair_id_seq OWNED BY public.vendor_repair.id;
          public          postgres    false    221            r           2604    24862    folder_paths id    DEFAULT     r   ALTER TABLE ONLY public.folder_paths ALTER COLUMN id SET DEFAULT nextval('public.folder_paths_id_seq'::regclass);
 >   ALTER TABLE public.folder_paths ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    224    223    224            p           2604    24706    microsoft id    DEFAULT     l   ALTER TABLE ONLY public.microsoft ALTER COLUMN id SET DEFAULT nextval('public.microsoft_id_seq'::regclass);
 ;   ALTER TABLE public.microsoft ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    220    219    220            o           2604    24697    pc id    DEFAULT     ^   ALTER TABLE ONLY public.pc ALTER COLUMN id SET DEFAULT nextval('public.pc_id_seq'::regclass);
 4   ALTER TABLE public.pc ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    218    217    218            u           2604    25032 	   server id    DEFAULT     f   ALTER TABLE ONLY public.server ALTER COLUMN id SET DEFAULT nextval('public.server_id_seq'::regclass);
 8   ALTER TABLE public.server ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    228    227    228            t           2604    24898 	   telnet id    DEFAULT     f   ALTER TABLE ONLY public.telnet ALTER COLUMN id SET DEFAULT nextval('public.telnet_id_seq'::regclass);
 8   ALTER TABLE public.telnet ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    225    226    226            n           2604    24688    users id    DEFAULT     d   ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);
 7   ALTER TABLE public.users ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    216    215    216            q           2604    24853    vendor_repair id    DEFAULT     t   ALTER TABLE ONLY public.vendor_repair ALTER COLUMN id SET DEFAULT nextval('public.vendor_repair_id_seq'::regclass);
 ?   ALTER TABLE public.vendor_repair ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    221    222    222            $          0    24859    folder_paths 
   TABLE DATA           J   COPY public.folder_paths (id, folder_path, created_at, title) FROM stdin;
    public          postgres    false    224   �Q                  0    24703 	   microsoft 
   TABLE DATA           �   COPY public.microsoft (id, company_name, department, user_name, account, products_name, sku_number, version, type_license, contact_number, qty, effective_date, expired_date, po, vendor_name, email_vendor) FROM stdin;
    public          postgres    false    220   ER                 0    24694    pc 
   TABLE DATA           �   COPY public.pc (id, it_code, brand, serial_number, ip_address, mac_address, host_name, location, business_unit, department, username, status) FROM stdin;
    public          postgres    false    218   �R       (          0    25029    server 
   TABLE DATA           �  COPY public.server (id, rack, seq, type, active, asset_category, asset_number, asset_tag_number, site, location, "user", job_title, bu, domain, deposit_cyberark, server_ownership, application_owner, system_owner, business_unit, add_in_solarwinds, server_role, brand, mac_address, host_name, ip_address, ilo, model, serial_no, physical_virtual, power_supply_model, eosl_date, planned_refresh_date, eosl_status, cip, date_purchased, power_supply_model_description, power_consumption, btu_hour, po_renewal_maintenance_contract, po_purchase_material, cost_local_currency, indicate_which_currency, cost_usd, utilization_storage, criticality_rating, dr_enable, warranty_start_date, end_date, date_disposed, core_each_processor, number_of_physical_processor, total_core, cpu, ram, hard_disk, part_number_harddisk, usb_disabled, cd_dvd, os_version, remarks, ms_office_version, druva, ip_guard, fde) FROM stdin;
    public          postgres    false    228   DS       &          0    24895    telnet 
   TABLE DATA           v   COPY public.telnet (id, area, role, ip_address, hostname, brand, device_type, serial_number, source_date) FROM stdin;
    public          postgres    false    226   LU                 0    24685    users 
   TABLE DATA           =   COPY public.users (id, username, password, name) FROM stdin;
    public          postgres    false    216   �U       "          0    24850    vendor_repair 
   TABLE DATA           �   COPY public.vendor_repair (id, repair_date, ticket_number, engineer_name, username, bu_name, material_name, brand, type, serial_number, cost_center, pr_number, po_number, quotation_date, cost_without, status, vendor_delivery_date, remarks) FROM stdin;
    public          postgres    false    222   �V       6           0    0    folder_paths_id_seq    SEQUENCE SET     B   SELECT pg_catalog.setval('public.folder_paths_id_seq', 17, true);
          public          postgres    false    223            7           0    0    microsoft_id_seq    SEQUENCE SET     @   SELECT pg_catalog.setval('public.microsoft_id_seq', 193, true);
          public          postgres    false    219            8           0    0 	   pc_id_seq    SEQUENCE SET     8   SELECT pg_catalog.setval('public.pc_id_seq', 37, true);
          public          postgres    false    217            9           0    0    server_id_seq    SEQUENCE SET     <   SELECT pg_catalog.setval('public.server_id_seq', 97, true);
          public          postgres    false    227            :           0    0    telnet_id_seq    SEQUENCE SET     <   SELECT pg_catalog.setval('public.telnet_id_seq', 32, true);
          public          postgres    false    225            ;           0    0    users_id_seq    SEQUENCE SET     :   SELECT pg_catalog.setval('public.users_id_seq', 7, true);
          public          postgres    false    215            <           0    0    vendor_repair_id_seq    SEQUENCE SET     C   SELECT pg_catalog.setval('public.vendor_repair_id_seq', 15, true);
          public          postgres    false    221            �           2606    24867    folder_paths folder_paths_pkey 
   CONSTRAINT     \   ALTER TABLE ONLY public.folder_paths
    ADD CONSTRAINT folder_paths_pkey PRIMARY KEY (id);
 H   ALTER TABLE ONLY public.folder_paths DROP CONSTRAINT folder_paths_pkey;
       public            postgres    false    224            �           2606    24710    microsoft microsoft_pkey 
   CONSTRAINT     V   ALTER TABLE ONLY public.microsoft
    ADD CONSTRAINT microsoft_pkey PRIMARY KEY (id);
 B   ALTER TABLE ONLY public.microsoft DROP CONSTRAINT microsoft_pkey;
       public            postgres    false    220            {           2606    24701 
   pc pc_pkey 
   CONSTRAINT     H   ALTER TABLE ONLY public.pc
    ADD CONSTRAINT pc_pkey PRIMARY KEY (id);
 4   ALTER TABLE ONLY public.pc DROP CONSTRAINT pc_pkey;
       public            postgres    false    218            �           2606    25036    server server_pkey 
   CONSTRAINT     P   ALTER TABLE ONLY public.server
    ADD CONSTRAINT server_pkey PRIMARY KEY (id);
 <   ALTER TABLE ONLY public.server DROP CONSTRAINT server_pkey;
       public            postgres    false    228            �           2606    24904    telnet telnet_ip_address_key 
   CONSTRAINT     ]   ALTER TABLE ONLY public.telnet
    ADD CONSTRAINT telnet_ip_address_key UNIQUE (ip_address);
 F   ALTER TABLE ONLY public.telnet DROP CONSTRAINT telnet_ip_address_key;
       public            postgres    false    226            �           2606    24902    telnet telnet_pkey 
   CONSTRAINT     P   ALTER TABLE ONLY public.telnet
    ADD CONSTRAINT telnet_pkey PRIMARY KEY (id);
 <   ALTER TABLE ONLY public.telnet DROP CONSTRAINT telnet_pkey;
       public            postgres    false    226            }           2606    24826    pc unique_ip_address 
   CONSTRAINT     U   ALTER TABLE ONLY public.pc
    ADD CONSTRAINT unique_ip_address UNIQUE (ip_address);
 >   ALTER TABLE ONLY public.pc DROP CONSTRAINT unique_ip_address;
       public            postgres    false    218                       2606    24828    pc unique_mac_address 
   CONSTRAINT     W   ALTER TABLE ONLY public.pc
    ADD CONSTRAINT unique_mac_address UNIQUE (mac_address);
 ?   ALTER TABLE ONLY public.pc DROP CONSTRAINT unique_mac_address;
       public            postgres    false    218            w           2606    24690    users users_pkey 
   CONSTRAINT     N   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);
 :   ALTER TABLE ONLY public.users DROP CONSTRAINT users_pkey;
       public            postgres    false    216            y           2606    24692    users users_username_key 
   CONSTRAINT     W   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_username_key UNIQUE (username);
 B   ALTER TABLE ONLY public.users DROP CONSTRAINT users_username_key;
       public            postgres    false    216            �           2606    24857     vendor_repair vendor_repair_pkey 
   CONSTRAINT     ^   ALTER TABLE ONLY public.vendor_repair
    ADD CONSTRAINT vendor_repair_pkey PRIMARY KEY (id);
 J   ALTER TABLE ONLY public.vendor_repair DROP CONSTRAINT vendor_repair_pkey;
       public            postgres    false    222            $   L   x�34�t�����+K�+�/�4�3��I���bb���9��Ltt,,�L�H����Ғ��(?+5�+F��� �          �   x�ՎM
�0�דS�R�I��΀i��sSj�ہDoo-x��[��ŧ-�ot9v��������|�p�����4ü��?^Ii�9�L�,,ч��h2e���V��'"�I���R*=|����ę�'��t��E��(�5��T���+��B�/�,�         <   x�36�440��I��/���447�32�3�3�4��,�L����%��ə)���\1z\\\ XBY      (   �  x�u��n�0 ���+������[R����J��J��&,�6����� �j�����g� J#골��[G^�^�(�={v	[�
]�FjE�UU4���A*a�歱�1�N�&�0ӟ\�L_s}Q����N]��2]�һ�7]�&y�UI��)ͧ�M)��i>�ml&�`L�4�1��bMa�KQي+{\�㗑�`�ݹ�#����q����g��	䁸4�	SP`#�o֮�f�F{]�#�(��,�#������!%.d63��jD�Z��s��9��\�=���~HUꋉ�^(BBxk����O��c���^�-N®{��dl��s��Y@F��7d�W��G^r�ߌ�3Ʈ��2ސ�#_Ӝ2e���ze�)�SƠlK�F�8����6 �Q�6�#�]���R���V��䪌0
ttxWf^�y���u6��էW0 �G<�Ж+[΢�ͯGH�U�N���R���G���2Ƅ�J��D�~��*�������`0��5}      &   w   x�Mͱ
�PD�z�_�cgV$)+��	�N�D�^����n�u�8���m��eŶ�����|��y�_;;��|:D�ܔh���S���)�o
�I��O�\�N<�������.V         �   x�5̱r�0  �9��̂#�"HΈ^��`�G�׷��۞(ky4�jKCv���I׺���ᮬ�-��g���l?��R�)���*T��|�R E�����ȹ���v�\��\�d%���.S�D�y]-�	:�Ucl��qɁ_2ټaZ���G(��|�^�zw����K����I��P�LYSM����`w��,V��MiF1�7#�_��bJ�      "   �   x�m��� ���]X��{�̎��31b��%��[�6�*5H��Rp�q�JR�-�a��t���{d��4�nL��(mޭE�}Lr!?F�/vX�.X��>{Ϥ9В �*�MÆ����E���P��M��\���~��S�Z�k����c/�~=      